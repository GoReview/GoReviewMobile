import React, { useState } from "react";
import { TextInput, ActivityIndicator } from "react-native";
import { AxiosRequestConfig } from "axios";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "styled-components";
import {
	Keyboard,
	KeyboardAvoidingView,
	TouchableWithoutFeedback,
} from "react-native";

import { ClassCardProps } from "../../components/ClassCard";
import { BackButton } from "../../components/BackButton";

import { Container, Header, BackButtonContainer, Error } from "./styles";
import { GoReviewAPI } from "../../api";

export function ClassSearch() {
	const nav = useNavigation();
	const theme = useTheme();

	const [returnFromClassSearch, setReturnFromClassSearch] = useState(
		[] as ClassCardProps[]
	);
	const [classSearchError, setClassSearchError] = useState("");
	const [isLoading, setIsLoading] = useState(false);

	async function searchForClassWithID(id: string) {
		setIsLoading(true);

		const axiosConf: AxiosRequestConfig = {
			method: "get",
			url: "turmas/" + id,
			headers: {},
			data: "",
		};

		try {
			const res = await GoReviewAPI(axiosConf);
			console.log("[LOG] response from searchForClassWithID:", res);

			setReturnFromClassSearch(JSON.parse(res.data));
		} catch (error) {
			if (error.message === error404) {
				setClassSearchError("Turma não encontrada!");
			} else if (error.message === error400) {
				setClassSearchError("O ID está errado!");
			} else {
				console.log("Another error!");

				setClassSearchError(error.message);
			}

			setReturnFromClassSearch([]);
			setIsLoading(false);
			console.log("[ERROR] from searchForClassWithID:", JSON.stringify(error));

			return;
		}

		setClassSearchError("");
		setIsLoading(false);
	}

	function handleGoBack2Home() {
		nav.goBack();
	}

	return (
		<KeyboardAvoidingView behavior="position" enabled>
			<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
				<Container>
					<Header>
						<BackButtonContainer>
							<BackButton onPress={handleGoBack2Home} />
						</BackButtonContainer>

						<TextInput
							style={{
								flex: 1,
								height: 40,
								marginHorizontal: 20,
								paddingHorizontal: 10,
								borderWidth: 1,
								borderRadius: 5,
								borderColor: theme.colors.text,
							}}
							autoFocus
							autoCapitalize="none"
							autoCorrect={false}
							placeholder="Digite o ID da turma e tecle 'Enter'"
							placeholderTextColor={theme.colors.text}
							onSubmitEditing={(event) =>
								searchForClassWithID(event.nativeEvent.text)
							}
						/>

						{isLoading && (
							<ActivityIndicator
								color={theme.colors.shape}
								size="small"
								style={{ marginTop: 20 }}
							/>
						)}
					</Header>

					<Error>{classSearchError}</Error>
				</Container>
			</TouchableWithoutFeedback>
		</KeyboardAvoidingView>
	);
}

const error404 = "Request failed with status code 404";
const error400 = "Request failed with status code 400";
