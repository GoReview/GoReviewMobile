import React, { useState } from "react";
import { TextInputProps } from "react-native";
import { useTheme } from "styled-components";
import { Feather } from "@expo/vector-icons";

import {
	ChangePasswordVisibilityButton,
	IconContainer,
	Container,
	InputText,
} from "./styles";

interface Props extends TextInputProps {
	iconName: React.ComponentProps<typeof Feather>["name"];
	value: string;
}

export function PasswordInput({ iconName, value, ...rest }: Props) {
	const theme = useTheme();

	const [isPasswordVisible, setIsPasswordVisible] = useState(true);
	const [isFocused, setIsFocused] = useState(false);
	const [isFilled, setIsFilled] = useState(false);

	function handleInputFocus() {
		setIsFocused(true);
	}

	function handleInputBlur() {
		// lost focus
		setIsFilled(!!value);
		setIsFocused(false);
	}

	function handlePasswordVisibilityChange() {
		setIsPasswordVisible((oldValue) => !oldValue);
	}

	return (
		<Container isFocused={isFocused}>
			<IconContainer>
				<Feather
					color={
						isFocused || isFilled ? theme.colors.main : theme.colors.text_detail
					}
					name={iconName}
					size={24}
				/>
			</IconContainer>

			<InputText
				secureTextEntry={isPasswordVisible}
				onFocus={handleInputFocus}
				onBlur={handleInputBlur}
				autoCorrect={false}
				{...rest}
			/>

			<ChangePasswordVisibilityButton onPress={handlePasswordVisibilityChange}>
				<Feather
					name={isPasswordVisible ? "eye" : "eye-off"}
					color={theme.colors.text_detail}
					size={24}
				/>
			</ChangePasswordVisibilityButton>
		</Container>
	);
}
