import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { SignIn } from "../screens/SignIn";

const { Navigator, Screen } = createStackNavigator();

export function AuthRoutes() {
	return (
		// This is an unordered list of screens
		<Navigator headerMode="none" initialRouteName="SignIn">
			<Screen name="SignIn" component={SignIn} />
		</Navigator>
	);
}
