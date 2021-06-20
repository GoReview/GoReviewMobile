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

import { ClassCard, ClassCardProps } from "../../components/ClassCard";
import { GoReviewAPI } from "../../api";
import { BackButton } from "../../components/BackButton";

import { Container, Header, BackButtonContainer, Error } from "./styles";
import { List } from "../Home/styles";

export function ClassSearch() {
	const nav = useNavigation();
	const theme = useTheme();

	const [returnFromClassSearch, setReturnFromClassSearch] = useState(
		[] as ClassCardProps[]
	);
	const [classSearchError, setClassSearchError] = useState("");
	const [isLoading, setIsLoading] = useState(false);

	async function searchForClassWithID(id: string) {
		setReturnFromClassSearch([]);
		setClassSearchError("");
		setIsLoading(true);

		const axiosConf: AxiosRequestConfig = {
			url: "turmas/" + id,
			method: "get",
			headers: {},
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
				setClassSearchError(error.message);

				console.log("Another error!");
			}

			console.error(
				"[ERROR] from searchForClassWithID:",
				JSON.parse(error.request._response).message
			);
		}

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
							onSubmitEditing={(event) =>
								searchForClassWithID(event.nativeEvent.text)
							}
							placeholder="Digite o ID da turma e tecle 'Enter'"
							placeholderTextColor={theme.colors.text}
							autoCapitalize="none"
							autoCorrect={false}
							autoFocus
						/>
					</Header>

					{isLoading && (
						<ActivityIndicator
							color={theme.colors.main}
							style={{ marginTop: 20 }}
							size="small"
						/>
					)}

					<Error>{classSearchError}</Error>

					<List
						renderItem={({ item }) => <ClassCard data={item} />}
						keyExtractor={(item) => item.id}
						data={returnFromClassSearch}
					/>
				</Container>
			</TouchableWithoutFeedback>
		</KeyboardAvoidingView>
	);
}

const error404 = "Request failed with status code 404";
const error400 = "Request failed with status code 400";
