import { router } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { useAuthStore } from "./store/authStore";

export default function Index() {
	const { isAuthenticated } = useAuthStore();

	useEffect(() => {
		if (isAuthenticated === false) {
			router.push("/(auth)/login");
		} else if (isAuthenticated === true) {
			router.push("/(dashboard)/home");
		}
	}, [isAuthenticated]);

	if (isAuthenticated === null) {
		return (
			<View style={styles.container}>
				<ActivityIndicator size="large" color="#0000ff" />
				<Text style={styles.text}>Loading...</Text>
			</View>
		);
	}

	return null;
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		padding: 20,
		backgroundColor: "#f0f0f0",
	},
	text: {
		fontSize: 18,
		marginTop: 10,
	},
});
