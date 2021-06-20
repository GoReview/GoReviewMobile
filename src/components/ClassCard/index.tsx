import React from "react";
import { TouchableOpacityProps } from "react-native";
import { ThreeDotsOptionButton } from "../ThreeDotsOptionButton";

import { Container, Title, TitleContainer, Clickable } from "./styles";

export interface ClassCardProps {
	title: string;
	id: string;
}

interface Props extends TouchableOpacityProps {
	data: ClassCardProps;
}

export function ClassCard({ data, ...rest }: Props) {
	return (
		<Container>
			<TitleContainer>
				<Title textColor="white">{data.title}</Title>

				<ThreeDotsOptionButton />
			</TitleContainer>

			<Clickable {...rest} activeOpacity={0.6}></Clickable>
		</Container>
	);
}
