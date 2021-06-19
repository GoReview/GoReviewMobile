import { Alert } from "react-native";
import * as Google from "expo-google-app-auth";

import { GoReviewAPI } from "../api";
import AppInfo from "../../app.json";
import {
	AxiosConfig,
	Group,
	StoragedUser,
	UserToBeCreated,
	UserToBeVerifiedOnAxios,
} from "./types";

async function visualizeUser() {
	return GoReviewAPI({
		headers: {},
		method: "get",
		url: "usuarios",
	}).catch((error) => {
		if (error.response) {
			console.log("Error.response.status:", error.response.status);
		} else if (error.request) {
			console.log("Error.request:", error.request);
		} else {
			console.log("Error.message:", error.message);
		}
		console.log("Error.config:", error.config);
		throw new Error("visualizeUser" + error);
	});
}

async function seeIfUserExists(params: AxiosConfig) {
	try {
		return await GoReviewAPI(params);
	} catch (error) {}
}

export async function loginOrCreateUserWithGoogle(
	result: Exclude<Google.LogInResult, { type: "cancel" }>,
	group: Group
): Promise<StoragedUser> {
	const userToBeVerified: UserToBeVerifiedOnAxios = {
		email: result.user.email!,
		password: result.accessToken!,
	};
	const axiosReqParamsToVerifyIfUserExists: AxiosConfig = {
		data: userToBeVerified,
		headers: {},
		method: "post",
		url: "usuarios/signin",
	};

	const res = await seeIfUserExists(axiosReqParamsToVerifyIfUserExists);
	console.log("[LOG] result from axiosReqParamsToVerifyIfUserExists:", res);

	if (res?.status === 200) {
		// Here, user is logged in, search for it's info and update local storage.
		GoReviewAPI.defaults.headers.authorization = `Bearer ${res.data.token}`; // token to api

		console.log("[LOG] about to visualize user");
		const user_res = await visualizeUser();
		console.log("[LOG] visualizeUser:", user_res);

		const user: StoragedUser = {
			id: user_res.data.usuario.id,
			group: user_res.data.usuario.group,
			name: user_res.data.usuario.name,
			avatar_url: user_res.data.usuario.avatar_url,
			email: result.user.email!,
		};
		return user;
	} else {
		// Create new user:
		return createNewUserFromGoogle(result, group);
	}
}

async function createNewUserFromGoogle(
	GoogleLoginResult: Exclude<Google.LogInResult, { type: "cancel" }>,
	group: Group
): Promise<StoragedUser> {
	const userToBeCreated: UserToBeCreated = {
		email: GoogleLoginResult.user.email!,
		password: GoogleLoginResult.accessToken!,
		avatar_url: GoogleLoginResult.user.photoUrl!,
		group,
		name: GoogleLoginResult.user.name!,
	};
	const axiosReqParamsToCreateNewUser: AxiosConfig = {
		data: userToBeCreated,
		headers: {},
		method: "post",
		url: "usuarios",
	};

	const res = await GoReviewAPI(axiosReqParamsToCreateNewUser).catch(
		(error) => {
			if (error.response) {
				console.log("Error.response.status:", error.response.status);
			} else if (error.request) {
				console.log("Error.request:", error.request);
			} else {
				console.log("Error.message:", error.message);
			}
			console.log("Error.config:", error.config);
			throw new Error("axiosReqParamsToCreateNewUser:" + error);
		}
	);
	console.log("[LOG] result from axiosReqParamsToCreateNewUser:", res);

	if (res?.status === 201) {
		// User created
		GoReviewAPI.defaults.headers.authorization = `Bearer ${res.data.token}`; // token to api
		console.log("[LOG] res.data:", res.data);

		const user_res = await visualizeUser();
		console.log("[LOG] visualizeUser:", user_res);

		const user: StoragedUser = {
			id: user_res.data.usuario.id,
			name: user_res.data.usuario.name,
			group: user_res.data.usuario.group,
			email: GoogleLoginResult.user.email!,
			avatar_url: GoogleLoginResult.user.photoUrl!,
		};
		return user;
	} else throw new Error("createNewUserFromGoogle");
}

// export async function loginOrCreateUserWithEmail(
// 	user_data: UserToBeVerifiedOnAxios,
// 	group: Group
// ): Promise<StoragedUser> {
// 	const userToBeVerified: UserToBeVerifiedOnAxios = {
// 		email: user_data.email,
// 		password: user_data.password,
// 	};
// 	const axiosReqParamsToVerifyIfUserExists: AxiosConfig = {
// 		data: userToBeVerified,
// 		headers: {},
// 		method: "post",
// 		url: "usuarios/signin",
// 	};

// 	const res = await GoReviewAPI(axiosReqParamsToVerifyIfUserExists).catch(
// 		(error) => {
// 			if (error.response) {
// 				console.log("Error.response.status:", error.response.status);
// 			} else if (error.request) {
// 				console.log("Error.request:", error.request);
// 			} else {
// 				console.log("Error.message:", error.message);
// 			}
// 			console.log("Error.config:", error.config);
// 			console.error(error);
// 		}
// 	);
// 	console.log("res:", res);

// 	if (res?.status === 200) {
// 		// User created
// 		GoReviewAPI.defaults.headers.authorization = `Bearer ${res.data}`; // token to api

// 		const user_res = visualizeUser();

// 		const user: StoragedUser = {
// 			id: user_res.body.usuario.id,
// 			group,
// 			email: user_data.email,
// 			avatar_url: user_res.body.usuario.avatar_url,
// 			name: ,
// 		};
// 		return user;
// 	} else throw new Error();
// }

// export async function createNewUserFromEmail(
// 	user_data: UserToBeVerifiedOnAxios
// ): Promise<StoragedUser> {
// 	const userToBeVerified: UserToBeVerifiedOnAxios = {
// 		email: user_data.email,
// 		password: user_data.password,
// 	};
// 	const axiosReqParamsToVerifyIfUserExists: AxiosConfig = {
// 		data: userToBeVerified,
// 		headers: {},
// 		method: "post",
// 		url: "usuarios/signin",
// 	};
// }

export async function askUserIfIsStudentOrTeacher() {
	const resolve_ = (group: Group) => group;

	return await new Promise<Group>((resolve_) => {
		Alert.alert(
			"Antes de entrar/criar",
			"Você é estudante ou professor?",
			[
				{
					text: "Professor",
					onPress: () => resolve_("teacher"),
				},
				{
					text: "Estudante",
					onPress: () => resolve_("student"),
				},
			],
			{ cancelable: false }
		);
	});
}

export const debugUser: UserToBeVerifiedOnAxios = {
	email: "meu@email.com",
	password: "123456",
};

export const debugGabrielGoogleData: Google.LogInResult = {
	accessToken:
		"ya29.a0AfH6SMA2YRM0HrFv7harD1wDCKGO_MVl5y8tGqONVJ0gIR32UB1QM1SIavPf96ZLr1lJg5iqPIsUX9bjvTSCqBN98TP87JprhqKiGMALJIHHwUXr9LhqXG0twIm1XBP4-rEH5Hjb3ri_Qa5Zj3VgVCXdmvGs",
	idToken:
		"eyJhbGciOiJSUzI1NiIsImtpZCI6IjE5ZmUyYTdiNjc5NTIzOTYwNmNhMGE3NTA3OTRhN2JkOWZkOTU5NjEiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiI2NjgzNzc0MTUzMDItNjR1OWpmdHFtbTY1cWk2bmswYW5lMjVtOWNrMm9pMjQuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJhdWQiOiI2NjgzNzc0MTUzMDItNjR1OWpmdHFtbTY1cWk2bmswYW5lMjVtOWNrMm9pMjQuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMDk2MDk3MzUzNjk2MTQ0NzI2OTIiLCJlbWFpbCI6ImdhYnJpZWw5MjU0ODZAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImF0X2hhc2giOiJWMVVRLUNaWjRFN3dOamtCUGZqakdRIiwibmFtZSI6IkdhYnJpZWwgQWx2ZXMgQ3VuaGEiLCJwaWN0dXJlIjoiaHR0cHM6Ly9saDMuZ29vZ2xldXNlcmNvbnRlbnQuY29tL2EtL0FPaDE0R2hFTVN6OEVfWnVrUjhWQVM2aVhCUzVGWS1NMzZaazFKMTE1M0pnRGc9czk2LWMiLCJnaXZlbl9uYW1lIjoiR2FicmllbCIsImZhbWlseV9uYW1lIjoiQWx2ZXMgQ3VuaGEiLCJsb2NhbGUiOiJwdC1CUiIsImlhdCI6MTYyNDA1MzU1NSwiZXhwIjoxNjI0MDU3MTU1fQ.a3flZ9aPJYv2HQ00xMTGBOlswco3y3eW1wD1WUm6xEmRNEuOKrCbxQW85l3__Dm24gHxsbwbPzym2fe-fhVtMGqjwe1GWtRzDoFCxCfaCbNfaqtllGWsf_0YxoEYCdPmIvzP5rHcOAyeiN4ro-V7orz8DCqKbUg2IBnKhsUVXLWGb9t3lrZxWMNIoOuWWHjfYGLwf4r_IS1TyzA29jhNwjCU7_BCBNUuHIU2hdOPWIJCQ_icLiyo9nqn2b3RK6sdveXQu3Fwt4euLVVL6M7d7GBemFdu62EyjdKfrsjrtGFZpl7HE3nYn2Y0mgVD-Za8hqNNcRWlWJwrf2dqy1F4Mw",
	refreshToken:
		"1//0hKCeyqY2RPjXCgYIARAAGBESNwF-L9Irq6vJmENh2p-R34eFaAw3b4Obkp8eLXI6GqEfE-X-boaeOoPRoKz3LvIwULlN0H7b7i0",
	type: "success",
	user: {
		email: "gabriel925486@gmail.com",
		familyName: "Alves Cunha",
		givenName: "Gabriel",
		id: "109609735369614472692",
		name: "Gabriel Alves Cunha",
		photoUrl:
			"https://lh3.googleusercontent.com/a-/AOh14GhEMSz8E_ZukR8VAS6iXBS5FY-M36Zk1J1153JgDg=s96-c",
	},
};

export const userStorageKey = "@" + AppInfo.name + ":" + "user";

const data = {
	config: {
		adapter: "[Function xhrAdapter]",
		baseURL: "https://goreviewapp.gigalixirapp.com/api",
		data: '{"email":"gabriel925486@gmail.com","password":"ya29.a0AfH6SMA2YRM0HrFv7harD1wDCKGO_MVl5y8tGqONVJ0gIR32UB1QM1SIavPf96ZLr1lJg5iqPIsUX9bjvTSCqBN98TP87JprhqKiGMALJIHHwUXr9LhqXG0twIm1XBP4-rEH5Hjb3ri_Qa5Zj3VgVCXdmvGs","avatar_url":"https://lh3.googleusercontent.com/a-/AOh14GhEMSz8E_ZukR8VAS6iXBS5FY-M36Zk1J1153JgDg=s96-c","group":"teacher","name":"Gabriel Alves Cunha"}',
		headers: {
			Accept: "application/json, text/plain, */*",
			"Content-Type": "application/json;charset=utf-8",
		},
		maxBodyLength: -1,
		maxContentLength: -1,
		method: "post",
		timeout: 1000,
		transformRequest: ["[Function transformRequest]"],
		transformResponse: ["[Function transformResponse]"],
		url: "usuarios",
		validateStatus: "[Function validateStatus]",
		xsrfCookieName: "XSRF-TOKEN",
		xsrfHeaderName: "X-XSRF-TOKEN",
	},
	data: {
		message: "User Created!",
		token:
			"eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJnb3Jldmlld2FwaSIsImV4cCI6MTYyNDA1NTgxNywiZ3JvdXAiOiJ0ZWFjaGVyIiwiaWF0IjoxNjI0MDU0MDE3LCJpc3MiOiJnb3Jldmlld2FwaSIsImp0aSI6IjM4MjQzZTNjLWFhNWEtNDM1MS1hNGYwLTJlOTc2MmE4N2U3NiIsIm5iZiI6MTYyNDA1NDAxNiwic3ViIjoiY2M5YzBhYmEtN2U3NS00ZjdhLWFjYmItYmFjOTVmOWIxODdjIiwidHlwIjoiYWNjZXNzIn0.OPbcIAT7IilPU1o1McnWGJQ9QGdKZC8zXe4ivGlDXyviSyNlFSuJhuw7okjD4ANcosr-PaRwHrkUrXrjSb9pGA",
		usuario: {
			avatar_url:
				"https://lh3.googleusercontent.com/a-/AOh14GhEMSz8E_ZukR8VAS6iXBS5FY-M36Zk1J1153JgDg=s96-c",
			group: "teacher",
			id: "cc9c0aba-7e75-4f7a-acbb-bac95f9b187c",
			name: "Gabriel Alves Cunha",
		},
	},
	headers: {
		"access-control-allow-credentials": "true",
		"access-control-allow-origin": "*",
		"access-control-expose-headers": "",
		"alt-svc": "clear",
		"cache-control": "max-age=0, private, must-revalidate",
		"content-length": "657",
		"content-type": "application/json; charset=utf-8",
		date: "Fri, 18 Jun 2021 22:06:57 GMT",
		server: "nginx/1.17.7",
		via: "1.1 google",
		"x-request-id": "a7d072d0cb1db0e98b4ac994faa1ee9e",
	},
	request: {
		DONE: 4,
		HEADERS_RECEIVED: 2,
		LOADING: 3,
		OPENED: 1,
		UNSENT: 0,
		_aborted: false,
		_cachedResponse: undefined,
		_hasError: false,
		_headers: {
			accept: "application/json, text/plain, */*",
			"content-type": "application/json;charset=utf-8",
		},
		_incrementalEvents: false,
		_lowerCaseResponseHeaders: {
			"access-control-allow-credentials": "true",
			"access-control-allow-origin": "*",
			"access-control-expose-headers": "",
			"alt-svc": "clear",
			"cache-control": "max-age=0, private, must-revalidate",
			"content-length": "657",
			"content-type": "application/json; charset=utf-8",
			date: "Fri, 18 Jun 2021 22:06:57 GMT",
			server: "nginx/1.17.7",
			via: "1.1 google",
			"x-request-id": "a7d072d0cb1db0e98b4ac994faa1ee9e",
		},
		_method: "POST",
		_perfKey:
			"network_XMLHttpRequest_https://goreviewapp.gigalixirapp.com/api/usuarios",
		_requestId: null,
		_response:
			'{"message":"User Created!","token":"eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJnb3Jldmlld2FwaSIsImV4cCI6MTYyNDA1NTgxNywiZ3JvdXAiOiJ0ZWFjaGVyIiwiaWF0IjoxNjI0MDU0MDE3LCJpc3MiOiJnb3Jldmlld2FwaSIsImp0aSI6IjM4MjQzZTNjLWFhNWEtNDM1MS1hNGYwLTJlOTc2MmE4N2U3NiIsIm5iZiI6MTYyNDA1NDAxNiwic3ViIjoiY2M5YzBhYmEtN2U3NS00ZjdhLWFjYmItYmFjOTVmOWIxODdjIiwidHlwIjoiYWNjZXNzIn0.OPbcIAT7IilPU1o1McnWGJQ9QGdKZC8zXe4ivGlDXyviSyNlFSuJhuw7okjD4ANcosr-PaRwHrkUrXrjSb9pGA","usuario":{"id":"cc9c0aba-7e75-4f7a-acbb-bac95f9b187c","name":"Gabriel Alves Cunha","group":"teacher","avatar_url":"https://lh3.googleusercontent.com/a-/AOh14GhEMSz8E_ZukR8VAS6iXBS5FY-M36Zk1J1153JgDg=s96-c"}}',
		_responseType: "",
		_sent: true,
		_subscriptions: [],
		_timedOut: false,
		_trackingName: "unknown",
		_url: "https://goreviewapp.gigalixirapp.com/api/usuarios",
		readyState: 4,
		responseHeaders: {
			"access-control-allow-credentials": "true",
			"access-control-allow-origin": "*",
			"access-control-expose-headers": "",
			"alt-svc": "clear",
			"cache-control": "max-age=0, private, must-revalidate",
			"content-length": "657",
			"content-type": "application/json; charset=utf-8",
			date: "Fri, 18 Jun 2021 22:06:57 GMT",
			server: "nginx/1.17.7",
			via: "1.1 google",
			"x-request-id": "a7d072d0cb1db0e98b4ac994faa1ee9e",
		},
		responseURL: "https://goreviewapp.gigalixirapp.com/api/usuarios",
		status: 201,
		timeout: 1000,
		upload: {},
		withCredentials: true,
	},
	status: 201,
	statusText: undefined,
};
