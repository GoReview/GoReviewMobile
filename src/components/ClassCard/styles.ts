import styled from "styled-components/native";
import { RectButton } from "react-native-gesture-handler";
import { RFValue } from "react-native-responsive-fontsize";

import { TextColor } from "../SignInSocialButton/styles";

export const Container = styled.View`
	flex: 1;
	height: 300px;

	border-radius: 15px;
	border: 1px solid lightgray;

	margin: ${RFValue(15)}px;
`;

export const Clickable = styled(RectButton)`
	flex: 1;

	border-bottom-left-radius: 15px;
	border-bottom-right-radius: 15px;
`;

export const TitleContainer = styled.View`
	flex-direction: row;
	justify-content: space-between;

	background-color: ${({ theme }) => theme.colors.main};

	border-top-left-radius: 15px;
	border-top-right-radius: 15px;

	padding: ${RFValue(20)}px;
`;

export const Title = styled.Text<TextColor>`
	font-family: ${({ theme }) => theme.fonts.secondary_500};
	font-size: ${RFValue(20)}px;

	color: ${({ textColor }) => textColor};
`;
