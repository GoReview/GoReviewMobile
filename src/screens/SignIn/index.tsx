import React, { useState } from "react";
import { StatusBar, Alert, ActivityIndicator, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "styled-components";
import { RFValue } from "react-native-responsive-fontsize";

import { SingInSocialButton } from "../../components/SignInSocialButton";
import { useAuth } from "../../hooks/auth";

import { BlobAnimation_1 } from "../../components/BlobAnimation";
import { BlobAnimation_2 } from "../../components/BlobAnimation";
import { BlobAnimation_3 } from "../../components/BlobAnimation";
import { BlobAnimation_4 } from "../../components/BlobAnimation";

import GoogleLogoSvg from "../../assets/icons/svgs/google.svg";
import SignInSvg from "../../assets/icons/svgs/signIn.svg";
import EmailSvg from "../../assets/icons/svgs/email.svg";

import {
	AnimationContainer,
	CompanyDescription,
	FooterWrapper,
	CompanyName,
	SignInTitle,
	Container,
	Header,
	Footer,
	Anim_1,
	Anim_2,
	Anim_3,
	Anim_4,
} from "./styles";

export function SignIn() {
	const { signInWithGoogle } = useAuth();
	const nav = useNavigation();
	const theme = useTheme();

	const [isLoading, setIsLoading] = useState(false);

	async function handleSignInWithGoogle() {
		setIsLoading(true);

		try {
			await signInWithGoogle();
		} catch (error) {
			console.error("Erro ao autenticar com Google", error);

			Alert.alert("Erro ao autenticar com Google!");
		}

		setIsLoading(false);
	}

	async function handleSignInWithEmail() {
		nav.navigate("SignInWithEmail");
	}

	// try {
	// 	setIsLoading(true);
	// 	await signInWithEmail();
	// } catch (error) {
	// 	console.error("Erro ao autenticar com e-mail:", error);
	// 	Alert.alert("Erro ao autenticar com e-mail!");
	// } finally {
	// 	setIsLoading(false);
	// }

	return (
		<Container>
			<StatusBar
				backgroundColor="transparent"
				barStyle="dark-content"
				translucent
			/>

			<AnimationContainer>
				<Anim_1>
					<BlobAnimation_1 />
				</Anim_1>
				<Anim_2>
					<BlobAnimation_2 />
				</Anim_2>
				<Anim_3>
					<BlobAnimation_3 />
				</Anim_3>
				<Anim_4>
					<BlobAnimation_4 />
				</Anim_4>
			</AnimationContainer>

			<Header>
				<Image
					onError={(err) => console.log(err.nativeEvent.error)}
					source={require("../../assets/icons/imgs/logo.png")}
					style={{
						position: "relative",
						width: 55,
						height: 55,
					}}
				/>
				<CompanyName>GoReview</CompanyName>
				<CompanyDescription></CompanyDescription>

				<SignInSvg width={300} height={300} style={{ marginTop: 20 }} />
			</Header>

			<Footer>
				<SignInTitle>Faça seu login ou registre-se abaixo</SignInTitle>

				<FooterWrapper>
					<SingInSocialButton
						onPress={() => {
							handleSignInWithEmail();
						}}
						color={theme.colors.email_button}
						title="Entrar com e-mail"
						svgHeight={RFValue(20)}
						svgWidth={RFValue(20)}
						textColor={"black"}
						svg={EmailSvg}
					/>
					<SingInSocialButton
						onPress={() => {
							handleSignInWithGoogle();
						}}
						color={theme.colors.google_button}
						title="Entrar com Google"
						svgHeight={RFValue(20)}
						svgWidth={RFValue(20)}
						textColor={"white"}
						svg={GoogleLogoSvg}
					/>
				</FooterWrapper>

				{isLoading && (
					<ActivityIndicator
						color={theme.colors.main}
						style={{ marginTop: 20 }}
						size="small"
					/>
				)}
			</Footer>
		</Container>
	);
}

// SignInSvg from <a href='https://www.freepik.com/free-photos-vectors/technology'>Technology vector created by stories - www.freepik.com</a>
