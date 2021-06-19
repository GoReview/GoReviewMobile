import styled from "styled-components/native";
import { getStatusBarHeight } from "react-native-iphone-x-helper";
import { RFValue } from "react-native-responsive-fontsize";

export const Container = styled.View`
	margin-top: ${getStatusBarHeight()}px;

	align-items: center;
	justify-content: center;
`;

export const BackButtonContainer = styled.View`
	width: 44px;

	align-items: center;
	justify-content: center;

	border-radius: 22px;
`;

export const Header = styled.View`
	flex-direction: row;

	margin: 20px;
`;

export const Error = styled.Text`
	font-family: ${({ theme }) => theme.fonts.secondary_400};
	font-size: ${RFValue(10)}px;

	color: ${({ theme }) => theme.colors.main};
`;
