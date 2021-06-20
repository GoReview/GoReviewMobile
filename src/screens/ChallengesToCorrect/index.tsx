import React, { useState } from "react";
import { StatusBar } from "react-native";
import { useTheme } from "styled-components";

import { ChallengeList } from "../../components/ChallengeList";
import { debugData } from "../ChallengesToBeDone";

import { Container } from "./styles";

export function ChallengesToCorrect() {
	const theme = useTheme();

	const [challengesToCorrect, setChallengesToCorrect] = useState(debugData);

	return (
		<Container>
			<StatusBar
				backgroundColor={theme.colors.background_primary}
				barStyle="dark-content"
			/>

			<ChallengeList data={challengesToCorrect} />
		</Container>
	);
}
