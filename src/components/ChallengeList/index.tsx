import React from "react";

import { ChallengeProps } from "../ChallengeCard";
import { ChallengeCard } from "../ChallengeCard";

import { Container, List } from "./styles";

interface Props {
	data: ChallengeProps[];
}

export function ChallengeList({ data, ...rest }: Props) {
	return (
		<Container>
			<List
				data={data}
				keyExtractor={(item) => item.id}
				renderItem={({ item }) => <ChallengeCard data={item} />}
				showsVerticalScrollIndicator={false}
				fadingEdgeLength={20}
				{...rest}
			/>
		</Container>
	);
}
