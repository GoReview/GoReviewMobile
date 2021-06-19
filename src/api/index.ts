import axios from "axios";

export const GoReviewAPI = axios.create({
	baseURL: "https://goreviewapp.gigalixirapp.com/api",
	timeout: 1000,
});
