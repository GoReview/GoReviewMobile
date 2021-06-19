import styled from "styled-components/native";
import { FlatList } from "react-native";

import { ChallengeProps } from "../ChallengeCard";

export const Container = styled.View`
	width: 100%;
`;

export const List = styled(FlatList as new () => FlatList<ChallengeProps>)``;
