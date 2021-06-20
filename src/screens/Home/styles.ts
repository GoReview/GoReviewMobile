import styled from "styled-components/native";
import { getStatusBarHeight } from "react-native-iphone-x-helper";
import { FlatList } from "react-native";

import { BorderlessButton } from "react-native-gesture-handler";
import { ClassCardProps } from "../../components/ClassCard";

export const Container = styled.View`
	flex: 1;
`;

export const Header = styled.View`
	flex-direction: row;

	margin-right: 30px;
	margin-left: 30px;
	margin-top: ${getStatusBarHeight() + 15}px;
	margin-bottom: 20px;

	justify-content: space-between;
`;

export const List = styled(
	FlatList as new () => FlatList<ClassCardProps>
).attrs({
	showsVerticalScrollIndicator: false,
	fadingEdgeLength: 20,
})``;

export const SearchClassContainer = styled.View``;

export const SearchButton = styled(BorderlessButton)`
	/* width: 60px;

	align-items: center;
	justify-content: center; */
`;

export const CreateNewClassButtonContainer = styled.View``;

export const CreateNewClassButton = styled(BorderlessButton)`
	width: 60px;

	align-items: center;
	justify-content: center;
`;

export const ErrorContainer = styled.View`
	flex: 1;

	align-items: center;
	justify-content: center;
`;
