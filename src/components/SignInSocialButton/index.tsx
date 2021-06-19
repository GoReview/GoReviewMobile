import React from "react";
import { RectButtonProps } from "react-native-gesture-handler";
import { SvgProps } from "react-native-svg";

import { Button, IconContainer, Text } from "./styles";

interface Props extends RectButtonProps {
	title: string;
	color: string;
	textColor: string;
	svg: React.FC<SvgProps>;
	svgWidth: number;
	svgHeight: number;
}

export function SingInSocialButton({
	title,
	color,
	textColor,
	svg: Svg,
	svgWidth,
	svgHeight,
	...rest
}: Props) {
	return (
		<Button {...rest} color={color}>
			<IconContainer color={color}>
				<Svg width={svgWidth} height={svgHeight} />
			</IconContainer>
			<Text textColor={textColor}>{title}</Text>
		</Button>
	);
}
