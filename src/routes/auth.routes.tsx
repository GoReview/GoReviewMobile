import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { SignInWithEmail } from "../screens/SignIn/SignInWithEmail";
import { SignIn } from "../screens/SignIn";

const { Navigator, Screen } = createStackNavigator();

export function AuthRoutes() {
	return (
		// This is an unordered list of screens
		<Navigator headerMode="none" initialRouteName="SignIn">
			<Screen name="SignInWithEmail" component={SignInWithEmail} />
			<Screen name="SignIn" component={SignIn} />
		</Navigator>
	);
}
