import React from "react";
import { TouchableOpacityProps } from "react-native";

import { Container, Title } from "../ClassCard/styles";

import {
	FooterContainer,
	FooterWrapper,
	Description,
	ClassTitle,
	Footer,
	Header,
	Dates,
} from "./styles";

export interface ChallengeProps {
	creationDate: string;
	deliverDate: string;
	description: string;
	classTitle: string;
	classId: string;
	title: string;
	id: string;
}

interface Props extends TouchableOpacityProps {
	data: ChallengeProps;
}

export function ChallengeCard({ data }: Props) {
	return (
		<Container>
			<Header>
				<Title textColor="black">{data.title}</Title>
				<ClassTitle>{data.classTitle}</ClassTitle>
			</Header>

			<FooterContainer>
				<Footer>
					<Description>{data.description}</Description>

					<FooterWrapper>
						<Dates>Criado em: {data.creationDate}</Dates>
						<Dates>Entrega até: {data.deliverDate}</Dates>
					</FooterWrapper>
				</Footer>
			</FooterContainer>
		</Container>
	);
}
