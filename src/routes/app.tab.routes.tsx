import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons, Feather } from "@expo/vector-icons";
import { Platform } from "react-native";
import { useTheme } from "styled-components";

import { ChallengesToCorrect } from "../screens/ChallengesToCorrect";
import { ChallengesToBeDone } from "../screens/ChallengesToBeDone";
import { AppStackRoutes } from "./app.stack.routes";

const { Navigator, Screen } = createBottomTabNavigator();

export function AppTabRoutes() {
	const theme = useTheme();

	return (
		// This is an ordered list of screens
		<Navigator
			tabBarOptions={{
				activeTintColor: theme.colors.main,
				inactiveTintColor: theme.colors.text_detail,
				showLabel: false,
				style: {
					paddingVertical: Platform.OS === "ios" ? 20 : 0,
					height: 58,
					backgroundColor: theme.colors.background_primary,
				},
			}}
			initialRouteName="Home"
		>
			<Screen
				name="ChallengesToBeDone"
				component={ChallengesToBeDone}
				options={{
					tabBarIcon: ({ size, color }) => (
						<MaterialCommunityIcons name="puzzle" size={size} color={color} />
					),
				}}
			/>
			<Screen
				name="Home"
				component={AppStackRoutes}
				options={{
					tabBarIcon: ({ size, color }) => (
						<Feather name="home" size={size} color={color} />
					),
				}}
			/>

			<Screen
				name="ChallengesToCorrect"
				component={ChallengesToCorrect}
				options={{
					tabBarIcon: ({ size, color }) => (
						<MaterialCommunityIcons
							name="checkbox-multiple-marked-circle-outline"
							size={size}
							color={color}
						/>
					),
				}}
			/>
		</Navigator>
	);
}
