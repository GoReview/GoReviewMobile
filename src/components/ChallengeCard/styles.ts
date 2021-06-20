import styled from "styled-components/native";
import { RectButton } from "react-native-gesture-handler";
import { BlurView } from "expo-blur";
import { RFValue } from "react-native-responsive-fontsize";

export const Container = styled.View``;

export const Header = styled.View`
	flex-direction: row;
	height: ${RFValue(80)}px;

	padding: ${RFValue(20)}px;

	justify-content: space-between;
	align-items: center;

	background-color: ${({ theme }) => theme.colors.shape};

	border-top-left-radius: 15px;
	border-top-right-radius: 15px;
`;

export const FooterContainer = styled.View`
	flex: 1;

	background-color: ${({ theme }) => theme.colors.background_secondary};

	border-bottom-right-radius: ${RFValue(10)}px;
	border-bottom-left-radius: ${RFValue(10)}px;
`;

export const Footer = styled(RectButton)`
	flex: 1;
	width: 100%;
`;

export const Title = styled.Text`
	font-family: ${({ theme }) => theme.fonts.secondary_500};
	font-size: ${RFValue(20)}px;
`;

export const ClassTitle = styled.Text`
	padding: ${RFValue(20)}px;

	font-family: ${({ theme }) => theme.fonts.secondary_400};
	font-size: ${RFValue(10)}px;
`;

export const Description = styled.Text`
	padding: ${RFValue(20)}px;

	font-family: ${({ theme }) => theme.fonts.primary_400};
	font-size: ${RFValue(16)}px;
`;

export const FooterWrapper = styled.View`
	position: absolute;
	flex-direction: column;

	bottom: 10px;
	left: 10px;
`;

export const Dates = styled.Text`
	font-family: ${({ theme }) => theme.fonts.primary_400};
	font-size: ${RFValue(10.1)}px;
`;
