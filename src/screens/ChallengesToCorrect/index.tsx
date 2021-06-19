import React, { useState } from "react";
import { StatusBar } from "react-native";
import { useTheme } from "styled-components";

import { ChallengeList } from "../../components/ChallengeList";
import { Container } from "./styles";

import { debugData } from "../ChallengesToBeDone";

export function ChallengesToCorrect() {
	const theme = useTheme();

	const [challengesToCorrect, setChallengesToCorrect] = useState(debugData);

	return (
		<Container>
			<StatusBar
				barStyle="dark-content"
				backgroundColor={theme.colors.background_primary}
			/>

			<ChallengeList data={challengesToCorrect} />
		</Container>
	);
}
