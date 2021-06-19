import React, { useState } from "react";
import { StatusBar, Alert, ActivityIndicator } from "react-native";
import { useTheme } from "styled-components";
import { RFValue } from "react-native-responsive-fontsize";

import { SingInSocialButton } from "../../components/SignInSocialButton";
import { GoReviewAPI } from "../../api";
import { useAuth } from "../../hooks/auth";

import { BlobAnimation_1 } from "../../components/BlobAnimation";
import { BlobAnimation_2 } from "../../components/BlobAnimation";
import { BlobAnimation_3 } from "../../components/BlobAnimation";
import { BlobAnimation_4 } from "../../components/BlobAnimation";

import GoogleLogoSvg from "../../assets/icons/svgs/google.svg";
import SignInSvg from "../../assets/icons/svgs/signIn.svg";
import EmailSvg from "../../assets/icons/svgs/email.svg";

import {
	Container,
	Header,
	Footer,
	SignInTitle,
	FooterWrapper,
	AnimationContainer,
	Anim_1,
	Anim_2,
	Anim_3,
	Anim_4,
} from "./styles";

export function SignIn() {
	const { signInWithGoogle } = useAuth();
	const theme = useTheme();

	const [isLoading, setIsLoading] = useState(false);

	async function handleSignInWithGoogle() {
		try {
			setIsLoading(true);
			await signInWithGoogle();
		} catch (error) {
			console.error("Erro ao autenticar com Google", error);
			Alert.alert("Erro ao autenticar com Google!");
		} finally {
			setIsLoading(false);
		}
	}

	// async function handleSignInWithEmail() {
	// 	try {
	// 		setIsLoading(true);
	// 		await signInWithEmail();
	// 	} catch (error) {
	// 		console.error("Erro ao autenticar com e-mail:", error);
	// 		Alert.alert("Erro ao autenticar com e-mail!");
	// 	} finally {
	// 		setIsLoading(false);
	// 	}
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
				<SignInSvg width={300} />
			</Header>

			<Footer>
				<SignInTitle>Faça seu login ou registre-se abaixo</SignInTitle>

				<FooterWrapper>
					{/* <SingInSocialButton
						title="Entrar com e-mail"
						color={theme.colors.email_button}
						textColor={"black"}
						svg={EmailSvg}
						svgWidth={RFValue(20)}
						svgHeight={RFValue(20)}
						onPress={() => {
							handleSignInWithEmail();
						}}
					/> */}
					<SingInSocialButton
						title="Entrar com Google"
						color={theme.colors.google_button}
						textColor={"white"}
						svg={GoogleLogoSvg}
						svgWidth={RFValue(20)}
						svgHeight={RFValue(20)}
						onPress={() => {
							handleSignInWithGoogle();
						}}
					/>
				</FooterWrapper>

				{isLoading && (
					<ActivityIndicator
						color={theme.colors.main}
						size="small"
						style={{ marginTop: 20 }}
					/>
				)}
			</Footer>
		</Container>
	);
}

// SignInSvg from <a href='https://www.freepik.com/free-photos-vectors/technology'>Technology vector created by stories - www.freepik.com</a>
