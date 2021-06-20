import { ReactNode } from "react";

export type Group = "professor" | "estudent";

export interface StoragedUser {
	avatar_url: string;
	email: string;
	group: Group;
	name: string;
	id: string;
}

export interface UserToBeVerifiedOnAxios {
	password: string;
	name?: string;
	email: string;
}

export interface UserToBeCreated {
	avatar_url: string;
	password: string;
	email: string;
	group: Group;
	name: string;
}

type urlApiTypes =
	| "usuarios"
	| "usuarios/list"
	| "usuarios/signin"
	| "usuarios/reset"
	| "turmas"
	| "turmas/user"
	| "desafios/class";

export interface AxiosConfig {
	data?: UserToBeVerifiedOnAxios | StoragedUser;
	method: "get" | "post" | "delete";
	url: urlApiTypes;
	headers: Object;
}

export interface AuthProviderProps {
	children: ReactNode;
}

export interface AuthContextData {
	signInWithEmail(user_data: UserToBeVerifiedOnAxios): Promise<void>;
	signInWithGoogle(): Promise<void>;
	changePassword(): Promise<void>;
	isLoadingStoragedUser: boolean;
	user: StoragedUser | undefined;
	signOut(): Promise<void>;
}
