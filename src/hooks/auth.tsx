import React, { createContext, useContext, useEffect, useState } from "react";
import { Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Google from "expo-google-app-auth";

import { debugGabrielGoogleData, googleCredentials } from "../../secret";
import { awaitResOrErr } from "../../await";
import { GoReviewAPI } from "../api";
import {
	loginOrCreateUserWithGoogle,
	askUserIfIsStudentOrTeacher,
	loginOrCreateUserWithEmail,
	userStorageKey,
} from "./utils";
import {
	UserToBeVerifiedOnAxios,
	AuthProviderProps,
	AuthContextData,
	StoragedUser,
	AxiosConfig,
} from "./types";

const AuthContext = createContext({} as AuthContextData);

function AuthProvider({ children }: AuthProviderProps) {
	const [isLoadingStoragedUser, setIsLoadingStoragedUser] = useState(true);
	const [user, setUser] = useState<StoragedUser | undefined>(undefined);

	async function storeUser(user: StoragedUser) {
		const [, error] = await awaitResOrErr(
			AsyncStorage.setItem(userStorageKey, JSON.stringify(user))
		);
		if (!error) setUser(user);
	}

	async function signInWithGoogle() {
		const group = await askUserIfIsStudentOrTeacher();

		try {
			const googleLoginResult = await Google.logInAsync(googleCredentials);
			console.log("[LOG] Result google login:", googleLoginResult);

			if (googleLoginResult.type === "success") {
				storeUser(await loginOrCreateUserWithGoogle(googleLoginResult, group));
			}
		} catch (error) {
			console.error(
				"[ERROR] in auth",
				JSON.parse(error.request._response).message
			);
			throw new Error(error);
		}
	}

	async function changePassword() {
		try {
			const res = await GoReviewAPI({
				headers: {},
				method: "post",
				url: "usuarios/reset",
				data: { email: user!.email },
			} as AxiosConfig);

			console.log("\n[LOG]", res.data);
		} catch (error) {
			throw new Error(error);
		}
	}

	async function signInWithEmail(user_data: UserToBeVerifiedOnAxios) {
		const group = await askUserIfIsStudentOrTeacher();

		try {
			storeUser(await loginOrCreateUserWithEmail(user_data, group));
		} catch (error) {
			throw new Error("\n[ERROR] signInWithEmail:" + error);
		}
	}

	async function signOut() {
		await AsyncStorage.removeItem(userStorageKey).catch((error) => {
			if (error.response)
				console.log("\nError.response in signOut:", error.response);
			else if (error.request)
				console.log("\nError.request in signOut:", error.request);
			else if (error.message)
				console.log("\nError.message in signOut:", error.message);
			console.error(error);
			Alert.alert("\nErro:", "Falha ao remover usuário do dispositivo!");
		});
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
				isLoadingStoragedUser,
				signInWithGoogle,
				signInWithEmail,
				changePassword,
				signOut,
				user,
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
