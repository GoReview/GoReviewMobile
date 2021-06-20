import React from "react";
import { RectButtonProps } from "react-native-gesture-handler";
import { SvgProps } from "react-native-svg";

import { Button, IconContainer, Text } from "./styles";

interface Props extends RectButtonProps {
	svg: React.FC<SvgProps>;
	textColor: string;
	svgHeight: number;
	svgWidth: number;
	color: string;
	title: string;
}

export function SingInSocialButton({
	textColor,
	svg: Svg,
	svgWidth,
	svgHeight,
	title,
	color,
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
