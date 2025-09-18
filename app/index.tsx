import { router } from "expo-router";
import { useEffect } from "react";
import { StyleSheet } from "react-native";
import {
	ThemedIcon,
	ThemedText,
	ThemedTouchableOpacity,
	ThemedView,
} from "./components";
import { supabase } from "./lib/supabase";

export default function Index() {
	useEffect(() => {
		const checkAuth = async () => {
			try {
				const {
					data: { user },
					error,
				} = await supabase.auth.getUser();
				if (user && !error) {
					router.push("/(dashboard)/home");
				}
			} catch (error) {
				console.log("Auth check error:", error);
			}
		};

		checkAuth();
	}, []);

	return (
		<ThemedView variant="background" style={styles.container}>
			<ThemedText
				variant="primary"
				size="xxxl"
				weight="bold"
				style={styles.heading}
			>
				Daily Goals Tracker
			</ThemedText>

			<ThemedView style={styles.buttonContainer}>
				<ThemedTouchableOpacity
					variant="primary"
					size="lg"
					style={styles.button}
					onPress={() => router.push("/(auth)/login")}
				>
					<ThemedIcon
						name="lock-closed"
						size={20}
						color="text"
						style={styles.icon}
					/>
					<ThemedText
						variant="primary"
						size="lg"
						weight="semibold"
						style={styles.buttonText}
					>
						Login
					</ThemedText>
				</ThemedTouchableOpacity>

				<ThemedTouchableOpacity
					variant="secondary"
					size="lg"
					style={styles.button}
					onPress={() => router.push("/(auth)/register")}
				>
					<ThemedIcon
						name="person-add"
						size={20}
						color="text"
						style={styles.icon}
					/>
					<ThemedText
						variant="primary"
						size="lg"
						weight="semibold"
						style={styles.buttonText}
					>
						Sign Up
					</ThemedText>
				</ThemedTouchableOpacity>
			</ThemedView>
		</ThemedView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		padding: 20,
	},
	heading: {
		marginBottom: 40,
		textAlign: "center",
		textTransform: "uppercase",
		letterSpacing: 1.5,
	},
	buttonContainer: {
		width: "100%",
		alignItems: "center",
		marginTop: 30,
	},
	button: {
		marginBottom: 20,
		width: "80%",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
	},
	icon: {
		marginRight: 10,
	},
	buttonText: {
		textAlign: "center",
	},
});
