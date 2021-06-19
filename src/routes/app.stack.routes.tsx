import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { CreateNewChallenge } from "../screens/CreateNewChallenge";
import { CreateNewClassRoom } from "../screens/CreateNewClassRoom";
import { ClassSearch } from "../screens/ClassSearch";
import { Home } from "../screens/Home";

const { Navigator, Screen } = createStackNavigator();

export function AppStackRoutes() {
	return (
		// This is an unordered list of screens
		<Navigator headerMode="none" initialRouteName="Home">
			<Screen name="CreateNewChallenge" component={CreateNewChallenge} />
			<Screen name="CreateNewClassRoom" component={CreateNewClassRoom} />
			<Screen name="ClassSearch" component={ClassSearch} />
			<Screen name="Home" component={Home} />
		</Navigator>
	);
}
