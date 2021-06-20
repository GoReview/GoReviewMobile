import React, { useState } from "react";
import { Alert, StatusBar, TextInput } from "react-native";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { useTheme } from "styled-components";
import { Feather } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import {
	TouchableWithoutFeedback,
	KeyboardAvoidingView,
	Keyboard,
} from "react-native";

import { useAuth } from "../../hooks/auth";
import { Button } from "../../components/Button";
import { PasswordInput } from "../../components/PasswordInput";

import {
	PhotoContainer,
	LogoutButton,
	HeaderTitle,
	OptionTitle,
	PhotoButton,
	HeaderTop,
	Container,
	Options,
	Content,
	Section,
	Header,
	Option,
	Photo,
} from "./styles";

export function Profile() {
	const { user, signOut, changePassword } = useAuth();
	const theme = useTheme();

	const [newPassword, setNewPassword] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [userPhoto, setUserPhoto] = useState("");

	function handleSignOut() {
		signOut();
	}

	function handleNewPasswordInput(text: string) {
		setNewPassword(text);
	}

	async function handleAvatarSelect() {
		try {
			const result = await ImagePicker.launchImageLibraryAsync({
				mediaTypes: ImagePicker.MediaTypeOptions.Images,
				allowsEditing: true,
				aspect: [4, 4],
				quality: 1,
			});

			if (result.cancelled) return;
			if (result.uri) setUserPhoto(result.uri);
		} catch (error) {
			console.error("\n[ERROR] handleAvatarSelect", error);
		}
	}

	async function handleUpdatePassword() {
		setIsLoading(true);

		try {
			changePassword();

			Alert.alert("Perfil atualizado com sucesso!");
		} catch (error) {
			console.error(
				"\n[ERROR] handleUpdatePassword:",
				JSON.parse(error.request._response).message
			);

			Alert.alert("Erro ao atualizar a senha :(");
		}

		setIsLoading(false);
	}

	return (
		<KeyboardAvoidingView behavior="position" enabled>
			<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
				<Container>
					<StatusBar
						backgroundColor={theme.colors.header}
						barStyle="light-content"
					/>

					<Header>
						<HeaderTop>
							<HeaderTitle>Editar Perfil</HeaderTitle>
							<LogoutButton onPress={handleSignOut}>
								<Feather name="log-out" size={24} color={theme.colors.shape} />
							</LogoutButton>
						</HeaderTop>

						<PhotoContainer>
							{!!userPhoto && <Photo source={{ uri: userPhoto }} />}
							<PhotoButton onPress={handleAvatarSelect}>
								<Feather
									color={theme.colors.background_primary}
									name="camera"
									size={24}
								/>
							</PhotoButton>
						</PhotoContainer>
					</Header>

					<Content style={{ marginBottom: useBottomTabBarHeight() + 25 }}>
						<Options>
							<Option active>
								<OptionTitle active>Trocar senha</OptionTitle>
							</Option>
						</Options>

						<Section>
							{/* <TextInput
								autoCapitalize="words"
								autoCorrect
								autoFocus
								placeholder="Digite o nome do desafio"
								placeholderTextColor={theme.colors.text}
								onChangeText={(text) => handleNewPasswordInput(text)}
								style={{
									flex: 1,
									height: 40,
									marginHorizontal: 20,
									paddingHorizontal: 10,
									borderWidth: 1,
									borderRadius: 5,
									borderColor: theme.colors.text,
								}}
							/> */}
						</Section>

						<Button
							onPress={handleUpdatePassword}
							enabled={!isLoading}
							title="Trocar senha"
						/>
					</Content>
				</Container>
			</TouchableWithoutFeedback>
		</KeyboardAvoidingView>
	);
}
