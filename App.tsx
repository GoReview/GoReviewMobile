import React from "react";
import { Alert, StatusBar } from "react-native";
import { ThemeProvider } from "styled-components";
import AppLoading from "expo-app-loading";

import {
	useFonts,
	Inter_400Regular,
	Inter_500Medium,
} from "@expo-google-fonts/inter";
import {
	Archivo_400Regular,
	Archivo_500Medium,
	Archivo_600SemiBold,
} from "@expo-google-fonts/archivo";

import { AuthProvider, useAuth } from "./src/hooks/auth";
import { Routes } from "./src/routes";

import theme from "./src/global/styles/theme";

export default function App() {
	const [areFontsLoaded, error] = useFonts({
		Inter_400Regular,
		Inter_500Medium,
		Archivo_400Regular,
		Archivo_500Medium,
		Archivo_600SemiBold,
	});
	const { isLoadingStoragedUser } = useAuth();

	if (!areFontsLoaded || isLoadingStoragedUser) {
		if (error) {
			console.error("Error loading fonts:", error);
			Alert.alert(
				"Erro ao carregar fontes",
				"Feche o app e tente novamente. Se o problema persistir, desistale e instale o app novamente."
			);
		}
		if (isLoadingStoragedUser) console.info("Loading storaged user.");
		return <AppLoading />;
	}

	return (
		<ThemeProvider theme={theme}>
			<StatusBar
				backgroundColor={theme.colors.header}
				barStyle="light-content"
			/>

			<AuthProvider>
				<Routes />
			</AuthProvider>
		</ThemeProvider>
	);
}
