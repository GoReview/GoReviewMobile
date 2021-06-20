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
		// if (error.response) {
		// 	console.log(
		// 		"\nError.response.status in visualizeUser:",
		// 		error.response.status
		// 	);
		// 	console.log("\nError.response in visualizeUser:", error.response);
		// }
		// if (error.request) {
		// 	console.log("\nError.request in visualizeUser:", error.request);
		// }
		if (error.message) {
			console.log("\nError.message in visualizeUser:", error.message);
		}
		// if (error.config) {
		// 	console.log("\nError.config in visualizeUser:", error.config);
		// }
		throw new Error(
			"\n[ERROR] visualizeUser in visualizeUser: " +
				JSON.parse(error.request._response).message
		);
	});
}

async function seeIfUserExists(params: AxiosConfig) {
	try {
		return await GoReviewAPI(params);
	} catch (error) {
		return error;
	}
}

export async function loginOrCreateUserWithGoogle(
	result: Exclude<Google.LogInResult, { type: "cancel" }>,
	group: Group
): Promise<StoragedUser> {
	const userToBeVerified: UserToBeVerifiedOnAxios = {
		email: result.user.email!,
		password: result.idToken!,
	};
	const axiosReqParamsToVerifyIfUserExists: AxiosConfig = {
		data: userToBeVerified,
		headers: {},
		method: "post",
		url: "usuarios/signin",
	};

	const res = await seeIfUserExists(axiosReqParamsToVerifyIfUserExists);
	console.log(
		"\n[LOG] result from axiosReqParamsToVerifyIfUserExists:\n\n",
		JSON.stringify(res),
		"\n\n",
		"RESPONSE:",
		JSON.parse(res.request._response).message
	);

	if (res.status === codeForOk_userDoesExists) {
		// Here, user is logged in, search for it's info and update local storage.
		GoReviewAPI.defaults.headers.authorization = `Bearer ${res.data.token}`; // authorization token to api

		const user_res = await visualizeUser();
		console.log("[LOG] visualizeUser:", user_res);

		return {
			id: user_res.data.usuario.id,
			group: user_res.data.usuario.group,
			name: user_res.data.usuario.name,
			avatar_url: user_res.data.usuario.avatar_url,
			email: result.user.email!,
		} as StoragedUser;
	} else {
		if (res.status === codeForUserDoesNotExists) {
			console.log("\n[LOG] Going to create a new user from Google\n");

			return (async function createNewUserFromGoogle(
				GoogleLoginResult: Exclude<Google.LogInResult, { type: "cancel" }>,
				group: Group
			): Promise<StoragedUser> {
				const userToBeCreated: UserToBeCreated = {
					email: GoogleLoginResult.user.email!,
					password: GoogleLoginResult.idToken!,
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
							console.log("\nError.response:", error.response);
							console.log("\nError.response.status:", error.response.status);
						}
						if (error.request) console.log("\nError.request:", error.request);
						if (error.message) console.log("\nError.message:", error.message);
						if (error.config) console.log("\nError.config:", error.config);

						throw new Error(
							"\n[ERROR] in axiosReqParamsToCreateNewUser: " +
								JSON.parse(error.request._response).message
						);
					}
				);
				console.log("\n[LOG] result from axiosReqParamsToCreateNewUser:", res);

				if (res?.status === 201) {
					// User created
					GoReviewAPI.defaults.headers.authorization = `Bearer ${res.data.token}`; // token to api
					console.log("\n[LOG] res.data:", res.data);

					const user_res = await visualizeUser();
					console.log("\n[LOG] visualizeUser:", user_res);

					const user: StoragedUser = {
						id: user_res.data.usuario.id,
						name: user_res.data.usuario.name,
						group: user_res.data.usuario.group,
						email: GoogleLoginResult.user.email!,
						avatar_url: GoogleLoginResult.user.photoUrl!,
					};
					return user;
				} else throw new Error("\n[ERROR] createNewUserFromGoogle");
			})(result, group);
		} else if (res.status === codeForUnauthorized) {
			console.error("\n[ERROR-LOG] Unauthorized error\n");
		}
		throw new Error(JSON.parse(res.request._response).message);
	}
}

export async function loginOrCreateUserWithEmail(
	user_data: UserToBeVerifiedOnAxios,
	group: Group
): Promise<StoragedUser> {
	const userToBeVerified: UserToBeVerifiedOnAxios = {
		email: user_data.email,
		password: user_data.password,
	};
	const axiosReqParamsToVerifyIfUserExists: AxiosConfig = {
		data: userToBeVerified,
		headers: {},
		method: "post",
		url: "usuarios/signin",
	};

	const res = await GoReviewAPI(axiosReqParamsToVerifyIfUserExists).catch(
		(error) => {
			// if (error.response) {
			// 	console.error(
			// 		"\nError.response in axiosReqParamsToVerifyIfUserExists:",
			// 		error.response
			// 	);
			// 	console.error(
			// 		"\nError.response.status in axiosReqParamsToVerifyIfUserExists:",
			// 		error.response.status
			// 	);
			// }
			// if (error.request)
			// 	console.error(
			// 		"\nError.request in axiosReqParamsToVerifyIfUserExists:",
			// 		error.request
			// 	);
			// if (error.message)
			// 	console.error(
			// 		"\nError.message in axiosReqParamsToVerifyIfUserExists in loginOrCreateUserWithEmail:",
			// 		error.message
			// 	);
			// if (error.config)
			// 	console.error(
			// 		"\nError.config in axiosReqParamsToVerifyIfUserExists:",
			// 		error.config
			// 	);

			throw new Error(
				"\n[ERROR] in axiosReqParamsToCreateNewUser: " +
					JSON.parse(error.request._response).message
			);
		}
	);
	console.log(
		"\n[LOG] result from axiosReqParamsToVerifyIfUserExists in loginOrCreateUserWithEmail:",
		res
	);

	if (res?.status === 200) {
		// User created
		GoReviewAPI.defaults.headers.authorization = `Bearer ${res.data}`; // token to api

		const user_res = await visualizeUser();

		const user: StoragedUser = {
			id: user_res.data.usuario.id,
			group,
			email: user_data.email,
			avatar_url: user_res.data.usuario.avatar_url,
			name: "",
		};
		return user;
	} else {
		// Create new user:
		if (res.status === codeForUserDoesNotExists) {
			console.log("\n[LOG] Going to create a new user\n");

			return (async function createNewUserFromEmail(
				user_data: UserToBeVerifiedOnAxios,
				group: Group
			): Promise<StoragedUser> {
				const userToCreated: UserToBeVerifiedOnAxios = {
					email: user_data.email,
					password: user_data.password,
				};
				const axiosReqParamsToCreateNewUserFromEmail: AxiosConfig = {
					data: userToCreated,
					headers: {},
					method: "post",
					url: "usuarios/signin",
				};

				const res = await GoReviewAPI(
					axiosReqParamsToCreateNewUserFromEmail
				).catch((error) => {
					// if (error.response) {
					// 	console.error(
					// 		"\nError.response in axiosReqParamsToCreateNewUserFromEmail:",
					// 		error.response
					// 	);
					// 	console.error(
					// 		"\nError.response.status in axiosReqParamsToCreateNewUserFromEmail:",
					// 		error.response.status
					// 	);
					// }
					// if (error.request)
					// 	console.error(
					// 		"\nError.request in axiosReqParamsToCreateNewUserFromEmail:",
					// 		error.request
					// 	);
					// if (error.message)
					// 	console.error(
					// 		"\nError.message in axiosReqParamsToCreateNewUserFromEmail in createNewUserFromEmail:",
					// 		error.message
					// 	);
					// if (error.config)
					// 	console.error(
					// 		"\nError.config in axiosReqParamsToCreateNewUserFromEmail:",
					// 		error.config
					// 	);

					throw new Error(
						"\n[ERROR] in axiosReqParamsToCreateNewUser: " +
							JSON.parse(error.request._response).message
					);
				});

				if (res?.status === codeForOk_userCreated) {
					GoReviewAPI.defaults.headers.authorization = `Bearer ${res.data}`; // authorization token to api

					const user_res = await visualizeUser();

					console.log("\n[LOG] user_res in createNewUserFromEmail:", user_res);

					return {
						id: user_res.data.usuario.id,
						group,
						email: user_data.email,
						avatar_url: user_res.data.usuario.avatar_url,
						name: user_data.name!,
					} as StoragedUser;
				} else throw new Error("\n[ERROR] createNewUserFromEmail");
			})(user_data, group);
		} else if (res.status === codeForUnauthorized) {
			console.error("\n[ERROR-LOG] Unauthorized error\n");
		}
		throw new Error(JSON.parse(res.request._response).message);
	}
}

export async function askUserIfIsStudentOrTeacher() {
	const resolve_ = (group: Group) => group;

	return await new Promise<Group>((resolve_) => {
		Alert.alert(
			"Antes de entrar/criar",
			"Você é estudante ou professor?",
			[
				{
					text: "Professor",
					onPress: () => resolve_("professor"),
				},
				{
					text: "Estudante",
					onPress: () => resolve_("estudent"),
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

export const userStorageKey = "@" + AppInfo.name + ":" + "user";

const codeForUserDoesNotExists = 404;
const codeForUnauthorized = 401;
const codeForOk_userDoesExists = 200;
const codeForOk_userCreated = 200;
