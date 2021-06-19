import styled from "styled-components/native";
import { Fontisto } from '@expo/vector-icons';
import { RFValue } from "react-native-responsive-fontsize";

export const Container = styled.View`
	flex: 1;

	background-color: ${({ theme }) => theme.colors.background_primary};
`;

export const Header = styled.View`
	align-items: center;
	justify-content: center;
`;

export const Footer = styled.View``;

export const SignInTitle = styled.Text`
	font-family: ${({ theme }) => theme.fonts.primary_400};
	font-size: ${RFValue(11)}px;
	line-height: 25px;

	text-align: center;

	color: ${({ theme }) => theme.colors.text};

	margin-bottom: 20px;
`;

export const FooterWrapper = styled.View`
	elevation: 10;
	overflow: visible;

	justify-content: space-between;
`;

export const AnimationContainer = styled.View`
	flex: 1;

	position: absolute;
`;

export const Anim_1 = styled.View`
	position: absolute;

	margin-top: -120px;
	margin-left: -120px;
`;

export const Anim_2 = styled.View`
	position: absolute;

	top: 690px;
	left: -50px;
`;

export const Anim_3 = styled.View`
	position: absolute;

	top: 380px;
	left: 250px;
`;

export const Anim_4 = styled.View`
	position: absolute;

	top: 50px;
	left: 320px;
`;

export const Icon = styled(Fontisto)`
	font-size: ${RFValue(20)}px;
	color: ${({ theme }) => theme.colors.text};
`;

