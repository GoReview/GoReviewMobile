import React, { useCallback, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { StatusBar } from "react-native";
import { useTheme } from "styled-components";

import { AxiosConfig, StoragedUser } from "../../hooks/types";
import { ChallengeProps } from "../../components/ChallengeCard";
import { ChallengeList } from "../../components/ChallengeList";
import { GoReviewAPI } from "../../api";
import { useAuth } from "../../hooks/auth";

import { Container } from "./styles";

interface ClassRoom {
	avatar_url: string;
	desafio: ChallengeProps[];
	id: string;
	name: string;
	usuario: Exclude<StoragedUser, "email">;
}

interface UserClasses {
	turmas: ClassRoom[];
}

export function ChallengesToBeDone() {
	const { user } = useAuth();
	const theme = useTheme();

	const [challengesToBeDone, setChallengesToBeDone] = useState(
		[] as ChallengeProps[]
	);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState("");

	useFocusEffect(
		useCallback(() => {
			let isMounted = true;

			(async function getUserClasses() {
				setIsLoading(true);
				setError("");
				// console.log(
				// 	"\n[LOG] Auth:",
				// 	GoReviewAPI.defaults.headers.authorization
				// );

				try {
					const res = await GoReviewAPI({
						method: "get",
						url: "turmas/user" + "/" + user!.id,
						headers: {},
					} as AxiosConfig);

					const roomClasses: UserClasses = res.data;
					//console.log("\n[LOG] roomClasses:", roomClasses);
					const { turmas } = roomClasses;
					const challenges: ChallengeProps[] = turmas
						.map((turma) => turma.desafio)
						.flat();
					console.log("\nchallenges: ", challenges);

					if (isMounted) {
						setChallengesToBeDone(challenges);
						setError("");
					}
				} catch (error) {
					console.error("\n[ERROR] in Home", error.request._response);
					console.log("\n", JSON.stringify(error));

					if (isMounted) setError(JSON.parse(error.request._response).message);
				}

				if (isMounted) setIsLoading(false);
			})();

			return () => {
				isMounted = false;
			};
		}, [])
	);

	return (
		<Container>
			<StatusBar
				backgroundColor={theme.colors.background_primary}
				barStyle="dark-content"
			/>

			<ChallengeList data={challengesToBeDone} />
		</Container>
	);
}
