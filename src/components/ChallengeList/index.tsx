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
				renderItem={({ item }) => <ChallengeCard data={item} />}
				showsVerticalScrollIndicator={false}
				keyExtractor={(item) => item.id}
				fadingEdgeLength={20}
				data={data}
				{...rest}
			/>
		</Container>
	);
}
