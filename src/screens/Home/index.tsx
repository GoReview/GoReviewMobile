import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "react-native";
import { useTheme } from "styled-components";
import { useAuth } from "../../hooks/auth";
import { Feather } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { ClassCardProps } from "../../components/ClassCard";
import { userStorageKey } from "../../hooks/utils";
import { ClassCard } from "../../components/ClassCard";

import { Container, List, SearchClass, SearchButton } from "./styles";

export function Home() {
	const clearAllTransactionData = false;
	const { user } = useAuth();
	const nav = useNavigation();
	const theme = useTheme();

	const [classes, setClasses] = useState(debugData as ClassCardProps[]);

	function handleGo2ClassSearch() {
		nav.navigate("ClassSearch");
	}

	if (clearAllTransactionData) clearDataFromAsyncStorage(userStorageKey);

	return (
		<Container>
			<StatusBar
				barStyle="dark-content"
				backgroundColor="transparent"
				translucent
			/>

			<SearchClass>
				<SearchButton onPress={() => handleGo2ClassSearch()}>
					<Feather name="search" size={24} />
				</SearchButton>
			</SearchClass>

			<List
				data={classes}
				keyExtractor={(item) => item.id}
				renderItem={({ item }) => <ClassCard data={item} />}
			/>
		</Container>
	);
}

async function clearDataFromAsyncStorage(Key: string) {
	const data = await AsyncStorage.removeItem(Key);
	console.log("Cleared transaction data:", data);
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
