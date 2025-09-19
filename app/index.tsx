import { router } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { supabase } from "./lib/supabase";

export default function Index() {
	const [loading, setLoading] = useState(true);
	useEffect(() => {
		const checkAuth = async () => {
			try {
				const {
					data: { user },
					error,
				} = await supabase.auth.getUser();
				if (user && !error) {
					router.push("/(dashboard)/home");
				} else {
					router.push("/(auth)/login");
				}
			} catch (error) {
				console.log("Auth check error:", error);
				router.push("/(auth)/login");
			} finally {
				setLoading(false);
			}
		};

		checkAuth();
	}, []);
	if (loading) {
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
