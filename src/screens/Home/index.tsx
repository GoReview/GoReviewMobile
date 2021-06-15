import React from "react";
import { StatusBar } from "react-native";

import { Container } from "./styles";

export function Home() {
	return (
		<Container>
			<StatusBar barStyle="light-content" />
		</Container>
	);
}
