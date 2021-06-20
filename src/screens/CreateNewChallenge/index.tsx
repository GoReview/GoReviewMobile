import React, { useState } from "react";
import { Alert, StyleProp, TextInput, TextStyle } from "react-native";
import { AxiosRequestConfig } from "axios";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "styled-components";

import { GoReviewAPI } from "../../api";
import { BackButton } from "../../components/BackButton";
import { Button } from "../../components/Button";

import { Container, ChallengeFieldsInput, Header } from "./styles";
import theme from "../../global/styles/theme";

interface ChallengeToBeCreated {
	data_revisao: string;
	data_envio: string;
	descricao: string;
	turma_id: string;
	titulo: string;
}

export function CreateNewChallenge() {
	const nav = useNavigation();
	const theme = useTheme();

	const [challengeTitle, setChallengeTitle] = useState("");
	const [revisionDate, setRevisionDate] = useState("");
	const [description, setDescription] = useState("");
	const [maxSendDate, setMaxSendDate] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [classId, setClassId] = useState("");

	function handleChallengeNameInput(name: string) {
		setChallengeTitle(name);
	}
	function handleRevisionDateInput(name: string) {
		setRevisionDate(name);
	}
	function handleDescriptionInput(name: string) {
		setDescription(name);
	}
	function handleSentDateInput(name: string) {
		setMaxSendDate(name);
	}

	async function handleCreateNewChalenge() {
		setIsLoading(true);

		const axiosConf: AxiosRequestConfig = {
			data: {
				titulo: challengeTitle,
				data_envio: maxSendDate,
				data_revisao: revisionDate,
				descricao: description,
				turma_id: classId,
			} as ChallengeToBeCreated,
			method: "post",
			url: "turmas/",
			headers: {},
		};

		try {
			await GoReviewAPI(axiosConf);

			Alert.alert("Challenge criada com sucesso");
		} catch (error) {
			const err = JSON.parse(error.request._response).message;
			console.error("\n[ERROR] ao criar challenge:", err);

			Alert.alert("Erro ao criar challenge", err);
		}

		setIsLoading(false);
	}

	function handleGoBack() {
		nav.goBack();
	}

	return (
		<Container>
			<Header>
				<BackButton color={theme.colors.shape} onPress={handleGoBack} />
			</Header>

			<ChallengeFieldsInput>
				<TextInput
					onChangeText={(text) => handleChallengeNameInput(text)}
					placeholderTextColor={theme.colors.text}
					placeholder="Digite o nome do desafio"
					autoCapitalize="words"
					style={style}
					autoCorrect
					autoFocus
				/>
				<TextInput
					onChangeText={(text) => handleDescriptionInput(text)}
					placeholderTextColor={theme.colors.text}
					placeholder="Descreva o desafio"
					autoCapitalize="words"
					style={style}
					autoCorrect
					autoFocus
				/>
				<TextInput
					onChangeText={(text) => handleRevisionDateInput(text)}
					placeholder="Digite a data de revisão (Ex.: 2021-06-23)"
					placeholderTextColor={theme.colors.text}
					autoCapitalize="words"
					style={style}
					autoCorrect
					autoFocus
				/>
				<TextInput
					placeholder="Digite a data máxima de envio (Ex.: 2021-06-25)"
					onChangeText={(text) => handleSentDateInput(text)}
					placeholderTextColor={theme.colors.text}
					autoCapitalize="words"
					style={style}
					autoCorrect
					autoFocus
				/>
			</ChallengeFieldsInput>

			<Button
				onPress={handleCreateNewChalenge}
				title="Criar desafio"
				enabled={!isLoading}
			/>
		</Container>
	);
}

const style: StyleProp<TextStyle> = {
	borderColor: theme.colors.text,
	paddingHorizontal: 10,
	marginHorizontal: 20,
	borderRadius: 5,
	borderWidth: 1,
	height: 40,
	flex: 1,
};
