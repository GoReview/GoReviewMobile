import styled from "styled-components/native";
import { getStatusBarHeight } from "react-native-iphone-x-helper";
import { RectButton } from "react-native-gesture-handler";

export const Container = styled.View`
	flex: 1;
	flex-direction: column;

	align-items: center;
	justify-content: center;

	margin-top: ${getStatusBarHeight() + 20}px;
`;

export const Header = styled.View`
	flex-direction: row;
`;

export const ClassRoomName = styled.View``;

export const ClassRoomPhoto = styled.View``;

export const PickPhotoButton = styled(RectButton)`
	width: 40px;
	height: 40px;

	justify-content: center;
	align-items: center;

	position: absolute;
	bottom: 10px;
	right: 10px;

	background-color: ${({ theme }) => theme.colors.main};
`;
