import { ReactNode } from "react";

export type Group = "teacher" | "student";

export interface StoragedUser {
	id: string;
	name: string;
	email: string;
	group: Group;
	avatar_url: string;
}

export interface UserToBeVerifiedOnAxios {
	email: string;
	password: string;
}

export interface UserToBeCreated {
	name: string;
	group: Group;
	email: string;
	password: string;
	avatar_url: string;
}

type urlApiTypes = "usuarios" | "usuarios/list" | "usuarios/signin" | "turmas/"

export interface AxiosConfig {
	method: "get" | "post" | "delete";
	url: urlApiTypes;
	headers: Object;
	data?: UserToBeVerifiedOnAxios | StoragedUser;
}

export interface AuthProviderProps {
	children: ReactNode;
}

export interface AuthContextData {
	user: StoragedUser | undefined;
	isLoadingStoragedUser: boolean;
	signInWithGoogle(): Promise<void>;
	// signInWithEmail(): Promise<void>;
	signOut(): Promise<void>;
}
