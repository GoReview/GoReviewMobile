import React, { useState } from "react";
import { AxiosRequestConfig } from "axios";
import { Alert, TextInput } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "styled-components";
import { Feather } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";

import { GoReviewAPI } from "../../api";
import { BackButton } from "../../components/BackButton";
import { Button } from "../../components/Button";

import {
	PickPhotoButton,
	ClassRoomPhoto,
	ClassRoomName,
	Container,
	Header,
} from "./styles";

export function CreateNewClassRoom() {
	const nav = useNavigation();
	const theme = useTheme();

	const [isLoading, setIsLoading] = useState(false);
	const [className, setClassName] = useState("");
	const [classPhoto, setPhoto] = useState("");

	function handleClassNameInput(name: string) {
		setClassName(name);
	}

	async function handleCreateNewClass() {
		setIsLoading(true);

		const axiosConf: AxiosRequestConfig = {
			data: { name: className, avatar_url: classPhoto },
			method: "post",
			url: "turmas/",
			headers: {},
		};

		try {
			await GoReviewAPI(axiosConf);

			Alert.alert("Classe criada com sucesso");
		} catch (error) {
			const err = JSON.parse(error.request._response).message;
			console.error("\n[ERROR] ao criar classe:", err);

			Alert.alert("Erro ao criar classe", err);
		}

		setIsLoading(false);
	}

	async function handlePhotoSelect() {
		const result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.Images,
			allowsEditing: true,
			aspect: [8, 4],
			quality: 1,
		});

		if (result.cancelled) return;
		if (result.uri) setPhoto(result.uri);
	}

	function handleGoBack() {
		nav.goBack();
	}

	return (
		<Container>
			<Header>
				<BackButton color={theme.colors.shape} onPress={handleGoBack} />
			</Header>

			<ClassRoomName>
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
					onChangeText={(text) => handleClassNameInput(text)}
					placeholderTextColor={theme.colors.text}
					placeholder="Digite o nome da turma"
					autoCapitalize="words"
					autoCorrect
					autoFocus
				/>
			</ClassRoomName>

			<ClassRoomPhoto>
				<PickPhotoButton onPress={handlePhotoSelect}>
					<Feather name="camera" size={24} color={theme.colors.shape} />
				</PickPhotoButton>
			</ClassRoomPhoto>

			<Button
				onPress={handleCreateNewClass}
				title="Salvar alterações"
				enabled={!isLoading}
			/>
		</Container>
	);
}
