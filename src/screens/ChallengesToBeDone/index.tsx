import React, { useCallback, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { StatusBar } from "react-native";
import { useTheme } from "styled-components";

import { ChallengeProps } from "../../components/ChallengeCard";
import { ClassCardProps } from "../../components/ClassCard";
import { ChallengeList } from "../../components/ChallengeList";
import { AxiosConfig } from "../../hooks/types";
import { GoReviewAPI } from "../../api";
import { useAuth } from "../../hooks/auth";

import { Container } from "./styles";

export function ChallengesToBeDone() {
	const { user } = useAuth();
	const theme = useTheme();

	const [challengesToBeDone, setChallengesToBeDone] = useState(
		debugData as ChallengeProps[]
	);
	const [classesId, setClassesId] = useState([] as string[]);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState("");

	async function handleGetChallengesToBeDone() {
		const promises = classesId.map((classId) => getChallenges(classId));

		try {
			const arrayOfChallengesForEachClassInAnotherArray = await Promise.all(
				promises
			);
			const challenges = arrayOfChallengesForEachClassInAnotherArray.map(
				(d) => {
					const r = [...d];
					console.log("\n[LOG] r é:", r);
				}
			);
			console.log("\n[LOG] challenges:", challenges);

			//setChallengesToBeDone();
		} catch (error) {
			console.error(
				"\n[ERROR] in handleGetChallengesToBeDone Promise.all:",
				JSON.parse(error.request._response).message
			);
		}
	}

	useFocusEffect(
		useCallback(() => {
			let isMounted = true;

			(async function getUserClasses() {
				setIsLoading(true);
				setError("");
				console.log(
					"\n[LOG] Auth:",
					GoReviewAPI.defaults.headers.authorization
				);

				try {
					const res = await GoReviewAPI({
						method: "get",
						url: "turmas/user" + "/" + user!.id,
						headers: {},
					});

					const roomClasses: ClassCardProps[] = res.data;
					console.log("\n[LOG] roomClasses:", roomClasses);

					setClassesId(roomClasses.map((classRoom) => classRoom.id));
					handleGetChallengesToBeDone();
					setError("");
				} catch (error) {
					console.error("\n[ERROR] in Home", error.request._response);
					console.log("\n", JSON.stringify(error));

					setError(JSON.parse(error.request._response).message);
				} finally {
					console.log("\n[LOG] Classes:", classesId);
					setIsLoading(false);
				}
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

async function getChallenges(classRoomId: string) {
	return GoReviewAPI({
		url: "desafios/class" + "/" + classRoomId,
		method: "get",
		headers: {},
	} as AxiosConfig).then((res) => res.data.desafios as ChallengeProps[]);
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
