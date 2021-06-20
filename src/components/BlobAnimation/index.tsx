import React from "react";
import LottieView from "lottie-react-native";

import BlobAnimationJSON_1 from "../../assets/animations/blob_animation_1.json";
import BlobAnimationJSON_2 from "../../assets/animations/blob_animation_2.json";
import BlobAnimationJSON_3 from "../../assets/animations/blob_animation_3.json";
import BlobAnimationJSON_4 from "../../assets/animations/blob_animation_4.json";

export function BlobAnimation_1() {
	return (
		<LottieView
			source={BlobAnimationJSON_1}
			style={{ height: 300 }}
			resizeMode="contain"
			autoPlay
			loop
		/>
	);
}

export function BlobAnimation_2() {
	return (
		<LottieView
			source={BlobAnimationJSON_2}
			style={{ height: 150 }}
			resizeMode="contain"
			autoPlay
			loop
		/>
	);
}

export function BlobAnimation_3() {
	return (
		<LottieView
			source={BlobAnimationJSON_3}
			style={{ height: 150 }}
			resizeMode="contain"
			autoPlay
			loop
		/>
	);
}

export function BlobAnimation_4() {
	return (
		<LottieView
			source={BlobAnimationJSON_4}
			style={{ height: 150 }}
			resizeMode="contain"
			autoPlay
			loop
		/>
	);
}
