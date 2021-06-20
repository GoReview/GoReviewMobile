import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import {
	TouchableWithoutFeedback,
	KeyboardAvoidingView,
	Keyboard,
} from "react-native";

import { PasswordInput } from "../../../components/PasswordInput";
import { BackButton } from "../../../components/BackButton";
import { useAuth } from "../../../hooks/auth";
import { Button } from "../../../components/Button";
import { Input } from "../../../components/Input";

import { Container, Header, Title, SubTitle, Form, FormTitle } from "./styles";

export function SignInWithEmail() {
	const { signInWithEmail } = useAuth();
	const nav = useNavigation();

	const [password, setPassword] = useState("");
	const [email, setEmail] = useState("");
	const [name, setName] = useState("");

	function handleGoBack2LoginScreen() {
		nav.goBack();
	}

	async function handleSignIn() {
		try {
			await signInWithEmail({ email, password, name });
		} catch (error) {
			console.error(error);
		}
	}

	return (
		<KeyboardAvoidingView behavior="position" enabled>
			<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
				<Container>
					<Header>
						<BackButton onPress={handleGoBack2LoginScreen} />
					</Header>

					<Title>Crie sua{"\n"}conta</Title>
					<SubTitle>
						Faça seu cadastro{"\n"}
						rápido e fácil
					</SubTitle>

					<Form>
						<FormTitle>1. Dados</FormTitle>
						<Input iconName="user" placeholder="Nome" onChangeText={setName} />
						<Input
							keyboardType="email-address"
							onChangeText={setEmail}
							placeholder="Email"
							iconName="mail"
						/>
						<PasswordInput
							onChangeText={setPassword}
							placeholder="Senha"
							value={password}
							iconName="lock"
						/>
					</Form>

					<Button title="Entrar" onPress={handleSignIn} />
				</Container>
			</TouchableWithoutFeedback>
		</KeyboardAvoidingView>
	);
}
