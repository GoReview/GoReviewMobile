import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { BackButton } from "../../components/BackButton";
import { useTheme } from "styled-components";

import { AxiosConfig } from "../../hooks/types";
import { GoReviewAPI } from "../../api";
import { Button } from "../../components/Button";

import { Container } from "./styles";

export function CorrectChallenge() {
	const nav = useNavigation();
	const theme = useTheme();

	const [isLoading, setIsLoading] = useState(false);
	const [] = useState("");

	function handleGoBack() {
		nav.goBack();
	}

	async function handleCorrectChallenge() {
		setIsLoading(true);

		try {
			// await GoReviewAPI({
			// 	headers: {},
			// 	method: "get",
			// 	url: "",
			// } as AxiosConfig);
		} catch (error) {
			console.error("[ERROR] in handleCorrectChallenge", error);
		}

		setIsLoading(false);
	}

	return (
		<Container>
			<BackButton color={theme.colors.shape} onPress={handleGoBack} />

			<Button
				onPress={handleCorrectChallenge}
				title="Salvar alterações"
				enabled={!isLoading}
			/>
		</Container>
	);
}
