import React, { useState } from "react";
import { StatusBar } from "react-native";
import { useTheme } from "styled-components";

import { ChallengeProps } from "../../components/ChallengeCard";
import { ChallengeList } from "../../components/ChallengeList";

import { Container } from "./styles";

export function ChallengesToBeDone() {
	const theme = useTheme();

	const [challengesToBeDone, setChallengesToBeDone] = useState(
		debugData as ChallengeProps[]
	);
	return (
		<Container>
			<StatusBar
				barStyle="dark-content"
				backgroundColor={theme.colors.background_primary}
			/>

			<ChallengeList data={challengesToBeDone} />
		</Container>
	);
}

export const debugData: ChallengeProps[] = [
	{
		id: "1232453",
		classId: "1324",
		classTitle: "C++",
		description: "Lorem Ipsum",
		creationDate: "12:45h de 12/06/2021",
		deliverDate: "23:59h de 12/06/2021",
		title: "C",
	},
	{
		id: "12655433",
		classId: "1324",
		classTitle: "C++",
		description: "Lorem Ipsum",
		creationDate: "12:45h de 12/06/2021",
		deliverDate: "23:59h de 12/06/2021",
		title: "C",
	},
	{
		id: "12746733",
		classId: "1324",
		classTitle: "C++",
		description: "Lorem Ipsum",
		creationDate: "12:45h de 12/06/2021",
		deliverDate: "23:59h de 12/06/2021",
		title: "C",
	},
	{
		id: "1235473",
		classId: "1324",
		classTitle: "C++",
		description: "Lorem Ipsum",
		creationDate: "12:45h de 12/06/2021",
		deliverDate: "23:59h de 12/06/2021",
		title: "C",
	},
	{
		id: "1275433",
		classId: "1324",
		classTitle: "C++",
		description: "Lorem Ipsum",
		creationDate: "12:45h de 12/06/2021",
		deliverDate: "23:59h de 12/06/2021",
		title: "C",
	},
];
