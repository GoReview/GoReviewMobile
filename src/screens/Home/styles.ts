import styled from "styled-components/native";
import { FlatList } from "react-native";
import { getStatusBarHeight } from "react-native-iphone-x-helper";

import { ClassCardProps } from "../../components/ClassCard";
import { BorderlessButton } from "react-native-gesture-handler";

export const Container = styled.View`
	flex: 1;
`;

export const List = styled(
	FlatList as new () => FlatList<ClassCardProps>
).attrs({
	showsVerticalScrollIndicator: false,
	fadingEdgeLength: 20,
})``;

export const SearchClass = styled.View`
	flex-direction: row;

	margin: 19px;
	margin-top: ${getStatusBarHeight() + 15}px;

	justify-content: flex-end;
`;

export const SearchButton = styled(BorderlessButton)`
	width: 60px;

	align-items: center;
	justify-content: center;
`;
