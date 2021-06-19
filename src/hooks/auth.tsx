import React, { createContext, useContext, useEffect, useState } from "react";
import { Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Google from "expo-google-app-auth";

import { googleCredentials } from "../../secret";
import { awaitResOrErr } from "../../await";
import {
	askUserIfIsStudentOrTeacher,
	debugGabrielGoogleData,
	debugUser,
	// loginOrCreateUserWithEmail,
	loginOrCreateUserWithGoogle,
	userStorageKey,
} from "./utils";
import {
	AuthContextData,
	AuthProviderProps,
	Group,
	StoragedUser,
} from "./types";

const AuthContext = createContext({} as AuthContextData);

function AuthProvider({ children }: AuthProviderProps) {
	const [user, setUser] = useState<StoragedUser | undefined>(undefined);
	const [isLoadingStoragedUser, setIsLoadingStoragedUser] = useState(true);

	async function storeUser(user: StoragedUser) {
		const [, error] = await awaitResOrErr(
			AsyncStorage.setItem(userStorageKey, JSON.stringify(user))
		);
		if (!error) setUser(user);
	}

	async function signInWithGoogle() {
		const group = await askUserIfIsStudentOrTeacher();
		console.log("group:", group);

		try {
			// const googleLoginResult = await Google.logInAsync(googleCredentials);
			// console.log("[LOG] Result google login:", googleLoginResult);

			if (debugGabrielGoogleData.type === "success") {
				// todo: change this
				storeUser(
					await loginOrCreateUserWithGoogle(debugGabrielGoogleData, group)
				);
			}
		} catch (error) {
			throw new Error(error);
		}
	}

	// async function signInWithEmail(user_data: UserToBeVerifiedOnAxios) {
	// 	const group: Group = askUserIfIsStudentOrTeacher();

	// 	try {
	// 		storeUser(await loginOrCreateUserWithEmail(user_data, group));
	// 	} catch (error) {
	// 		throw new Error(error);
	// 	}
	// }

	async function signOut() {
		await awaitResOrErr(AsyncStorage.removeItem(userStorageKey)).catch(
			(error) => {
				if (error.response) {
					console.log("Error.response:", error.response);
				} else if (error.request) {
					console.log("Error.request:", error.request);
				} else {
					console.log("Error.message:", error.message);
				}
				console.log("Error.config:", error.config);
				console.error(error);
				Alert.alert("Erro:", "Falha ao remover usuário do dispositivo!");
			}
		);
		setUser(undefined);
	}

	useEffect(() => {
		(async function loadStoragedUserData() {
			const storagedUser = await AsyncStorage.getItem(userStorageKey);

			if (storagedUser) {
				const loggedUser: StoragedUser = JSON.parse(storagedUser);
				console.log("Got storaged user:", loggedUser);
				setUser(loggedUser);
				setIsLoadingStoragedUser(false);
			}

			setIsLoadingStoragedUser(false);
		})();
	}, []);

	return (
		<AuthContext.Provider
			value={{
				user,
				isLoadingStoragedUser,
				signInWithGoogle,
				// signInWithEmail,
				signOut,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
}

function useAuth() {
	return useContext(AuthContext);
}

export { AuthProvider, useAuth };
