import styled, { css } from "styled-components/native";
import { BorderlessButton, TextInput } from "react-native-gesture-handler";
import { RFValue } from "react-native-responsive-fontsize";

interface ContainerProps {
	isFocused: boolean;
}

export const Container = styled.View<ContainerProps>`
	flex-direction: row;

	margin-bottom: 8px;

	${({ isFocused, theme }) =>
		isFocused &&
		css`
			border-bottom-width: 2px;
			border-bottom-color: ${theme.colors.main};
		`}
`;

export const IconContainer = styled.View`
	width: 55px;
	height: 56px;

	justify-content: center;
	align-items: center;

	margin-right: 2px;

	background-color: ${({ theme }) => theme.colors.background_secondary};
`;

export const InputText = styled(TextInput)`
	flex: 1; /* todo o restante de espaço que sobrar, ele ocupa. */

	background-color: ${({ theme }) => theme.colors.background_secondary};
	color: ${({ theme }) => theme.colors.text};

	font-family: ${({ theme }) => theme.fonts.primary_400};
	font-size: ${RFValue(15)}px;

	padding: 0 23px;
`;

export const ChangePasswordVisibilityButton = styled(BorderlessButton)`
	width: 55px;
	height: 56px;

	justify-content: center;
	align-items: center;

	background-color: ${({ theme }) => theme.colors.background_secondary};
`;
