import React, { useCallback, useState } from "react";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { StatusBar, ActivityIndicator } from "react-native";
import { useTheme } from "styled-components";
import { Feather } from "@expo/vector-icons";
import { useAuth } from "../../hooks/auth";

import { ClassCardProps } from "../../components/ClassCard";
import { GoReviewAPI } from "../../api";
import { ClassCard } from "../../components/ClassCard";
import { Error } from "../ClassSearch/styles";

import {
	CreateNewClassButtonContainer,
	CreateNewClassButton,
	SearchClassContainer,
	ErrorContainer,
	SearchButton,
	Container,
	Header,
	List,
} from "./styles";

export function Home() {
	const nav = useNavigation();
	const { user } = useAuth();
	const theme = useTheme();

	const [classes, setClasses] = useState([] as ClassCardProps[]);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState("");

	function handleGo2ClassSearch() {
		nav.navigate("ClassSearch");
	}

	function handleGo2CreateNewClassRoom() {
		nav.navigate("CreateNewClassRoom");
	}

	useFocusEffect(
		useCallback(() => {
			let isMounted = true;

			(async function getUserClasses() {
				setIsLoading(true);
				setError("");
				console.log("[LOG] Auth:", GoReviewAPI.defaults.headers.authorization);

				try {
					const res = await GoReviewAPI({
						url: "turmas/user" + "/" + user!.id,
						method: "get",
						headers: {},
					});

					setClasses(res.data);
					setError("");
				} catch (error) {
					console.error(
						"[ERROR] in Home",
						JSON.parse(error.request._response).message
					);

					setError(JSON.parse(error.request._response).message);
				} finally {
					console.log("\n[LOG] Classes:", classes);
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
				backgroundColor="transparent"
				barStyle="dark-content"
				translucent
			/>

			<Header>
				{user!.group === "professor" && (
					<CreateNewClassButtonContainer>
						<CreateNewClassButton onPress={handleGo2CreateNewClassRoom}>
							<Feather name="plus-circle" size={24} />
						</CreateNewClassButton>
					</CreateNewClassButtonContainer>
				)}

				<SearchClassContainer>
					<SearchButton onPress={() => handleGo2ClassSearch()}>
						<Feather name="search" size={24} />
					</SearchButton>
				</SearchClassContainer>
			</Header>

			{isLoading && (
				<ActivityIndicator
					color={theme.colors.main}
					style={{ marginTop: 20 }}
					size="small"
				/>
			)}

			<ErrorContainer>
				<Error>{error}</Error>
			</ErrorContainer>

			<List
				renderItem={({ item }) => <ClassCard data={item} />}
				keyExtractor={(item) => item.id}
				data={classes}
			/>
		</Container>
	);
}

const debugData: ClassCardProps[] = [
	{
		id: "1233",
		title: "C",
	},
	{
		id: "3243",
		title: "C++",
	},
	{
		id: "3243242",
		title: "Java",
	},
	{
		id: "32423443",
		title: "CSS",
	},
];
