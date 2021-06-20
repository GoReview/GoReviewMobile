import React, { useState } from "react";
import { TextInputProps } from "react-native";
import { useTheme } from "styled-components";
import { Feather } from "@expo/vector-icons";

import { Container, IconContainer, InputText } from "./styles";

interface Props extends TextInputProps {
	iconName: React.ComponentProps<typeof Feather>["name"];
	value?: string;
}

export function Input({ iconName, value, ...rest }: Props) {
	const theme = useTheme();

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
				onFocus={handleInputFocus}
				onBlur={handleInputBlur}
				autoCorrect={false}
				{...rest}
			/>
		</Container>
	);
}
