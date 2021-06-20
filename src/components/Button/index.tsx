import React from "react";
import { ActivityIndicator } from "react-native";
import { RectButtonProps } from "react-native-gesture-handler";
import { useTheme } from "styled-components";

import { Container, Title } from "./styles";

interface Props extends RectButtonProps {
	isLoading?: boolean;
	enabled?: boolean;
	light?: boolean;
	color?: string;
	title: string;
}

export function Button({
	isLoading = false,
	enabled = true,
	light = false,
	title,
	color,
	...rest
}: Props) {
	const theme = useTheme();

	return (
		<Container
			style={{ opacity: enabled === false || isLoading === true ? 0.5 : 1 }}
			enabled={enabled}
			color={color}
			{...rest}
		>
			{isLoading ? (
				<ActivityIndicator color={theme.colors.shape} />
			) : (
				<Title light={light}>{title}</Title>
			)}
		</Container>
	);
}
