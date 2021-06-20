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
	data_revisao: string;
	data_envio: string;
	descricao: string;
	turma_id: string;
	envio: string[];
	titulo: string;
	id: string;
}

interface Props extends TouchableOpacityProps {
	data: ChallengeProps;
}

export function ChallengeCard({ data }: Props) {
	return (
		<Container>
			<Header>
				<Title textColor="black">{data.titulo}</Title>
				{/* <ClassTitle>{data.classTitle}</ClassTitle> */}
			</Header>

			<FooterContainer>
				<Footer>
					<Description>{data.descricao}</Description>

					<FooterWrapper>
						<Dates>Enviado em: {data.data_envio}</Dates>
						<Dates>Última revisão em: {data.data_revisao}</Dates>
					</FooterWrapper>
				</Footer>
			</FooterContainer>
		</Container>
	);
}
