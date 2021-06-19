import styled from "styled-components/native";
import { RectButton } from "react-native-gesture-handler";
import { RFValue } from "react-native-responsive-fontsize";

export interface BackgroundColor {
	color: string;
}

export interface TextColor {
	textColor: string;
}

export const Button = styled(RectButton)<BackgroundColor>`
	width: 80%;
	height: ${RFValue(56)}px;

	background-color: ${({ color }) => color};
	border-radius: ${RFValue(28)}px;

	align-self: center;
	align-items: center;
	justify-content: center;

	flex-direction: row;

	margin-bottom: 20px;
`;

export const IconContainer = styled.View<BackgroundColor>`
	height: 100%;

	justify-content: center;
	align-items: center;

	background-color: white;

	padding: ${RFValue(16)}px;

	border-radius: ${RFValue(28)}px;
	border: 1px solid ${({ color }) => color};
`;

export const Text = styled.Text<TextColor>`
	flex: 1;
	text-align: center;

	font-family: ${({ theme }) => theme.fonts.primary_500};
	font-size: ${RFValue(14)}px;

	color: ${({ textColor }) => textColor};
`;
