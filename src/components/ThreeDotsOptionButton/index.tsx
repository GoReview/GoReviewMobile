import React from "react";
import { BorderlessButton } from "react-native-gesture-handler";

import { OuterContainer, InnerContainer, Dot } from "./styles";

interface Props extends BorderlessButton {}

export function ThreeDotsOptionButton({ ...rest }: Props) {
	return (
		<OuterContainer>
			<BorderlessButton
				style={{ width: "200%", alignContent: "center", alignItems: "center" }}
				{...rest}
			>
				<InnerContainer>
					<Dot marginBottom={3} />
					<Dot marginBottom={3} />
					<Dot marginBottom={0} />
				</InnerContainer>
			</BorderlessButton>
		</OuterContainer>
	);
}
