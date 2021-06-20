import React from "react";
import { MaterialCommunityIcons, Feather } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useTheme } from "styled-components";
import { Platform } from "react-native";

import { ChallengesToCorrect } from "../screens/ChallengesToCorrect";
import { ChallengesToBeDone } from "../screens/ChallengesToBeDone";
import { AppStackRoutes } from "./app.stack.routes";
import { Profile } from "../screens/Profile";

const { Navigator, Screen } = createBottomTabNavigator();

export function AppTabRoutes() {
	const theme = useTheme();

	return (
		// This is an ordered list of screens
		<Navigator
			tabBarOptions={{
				style: {
					paddingVertical: Platform.OS === "ios" ? 20 : 0,
					height: 58,
					backgroundColor: theme.colors.background_primary,
				},
				inactiveTintColor: theme.colors.text_detail,
				activeTintColor: theme.colors.main,
				showLabel: false,
			}}
			initialRouteName="Home"
		>
			<Screen
				options={{
					tabBarIcon: ({ size, color }) => (
						<MaterialCommunityIcons name="puzzle" size={size} color={color} />
					),
				}}
				component={ChallengesToBeDone}
				name="ChallengesToBeDone"
			/>
			<Screen
				options={{
					tabBarIcon: ({ size, color }) => (
						<Feather name="home" size={size} color={color} />
					),
				}}
				component={AppStackRoutes}
				name="Home"
			/>
			<Screen
				options={{
					tabBarIcon: ({ size, color }) => (
						<MaterialCommunityIcons
							name="checkbox-multiple-marked-circle-outline"
							size={size}
							color={color}
						/>
					),
				}}
				component={ChallengesToCorrect}
				name="ChallengesToCorrect"
			/>
			<Screen
				options={{
					tabBarIcon: ({ size, color }) => (
						<MaterialCommunityIcons name="human" size={size} color={color} />
					),
				}}
				component={Profile}
				name="Profile"
			/>
		</Navigator>
	);
}
