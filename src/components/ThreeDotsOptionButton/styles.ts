import styled from "styled-components/native";

interface MarginBottom {
	marginBottom: number;
}

export const InnerContainer = styled.View``;

export const OuterContainer = styled.View`
	width: 40px;
	height: 40px;

	border-radius: 20px;

	background-color: transparent;

	align-items: center;
	justify-content: center;
`;

export const Dot = styled.View<MarginBottom>`
	width: 6px;
	height: 6px;
	background-color: ${({ theme }) => theme.colors.threeDotsColor};

	margin-bottom: ${({ marginBottom }) => marginBottom}px;
	border-radius: 3px;
`;
