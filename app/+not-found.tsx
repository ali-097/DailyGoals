import { Link, Stack } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function NotFoundScreen() {
	return (
		<>
			<Stack.Screen
				options={{ title: "Oops! This screen doesn't exist." }}
			/>
			<View style={styles.container}>
				<Text style={styles.errorCode}>404</Text>
				<Text style={styles.message}>Page Not Found</Text>
				<Text style={styles.subtext}>
					The page you're looking for doesn’t exist or has been moved.
				</Text>

				<Link href="/" asChild>
					<Pressable style={styles.button}>
						<Text style={styles.buttonText}>Go to Home</Text>
					</Pressable>
				</Link>
			</View>
		</>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#f8f9fa",
		justifyContent: "center",
		alignItems: "center",
		padding: 24,
	},
	errorCode: {
		fontSize: 72,
		fontWeight: "bold",
		color: "#dc3545",
	},
	message: {
		fontSize: 24,
		fontWeight: "600",
		marginTop: 8,
		color: "#212529",
	},
	subtext: {
		fontSize: 16,
		color: "#6c757d",
		textAlign: "center",
		marginTop: 8,
		marginBottom: 24,
	},
	button: {
		backgroundColor: "#007bff",
		paddingVertical: 12,
		paddingHorizontal: 24,
		borderRadius: 6,
	},
	buttonText: {
		color: "#fff",
		fontSize: 16,
		fontWeight: "500",
	},
});
