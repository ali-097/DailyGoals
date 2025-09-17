import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useEffect } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
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
		<View style={styles.container}>
			<Text style={styles.heading}>Daily Goals Tracker</Text>

			<View style={styles.buttonContainer}>
				<TouchableOpacity
					style={styles.button}
					onPress={() => router.push("/(auth)/login")}
				>
					<Ionicons
						name="lock-closed"
						size={20}
						color="#fff"
						style={styles.icon}
					/>
					<Text style={styles.buttonText}>Login</Text>
				</TouchableOpacity>

				<TouchableOpacity
					style={styles.button}
					onPress={() => router.push("/(auth)/register")}
				>
					<Ionicons
						name="person-add"
						size={20}
						color="#fff"
						style={styles.icon}
					/>
					<Text style={styles.buttonText}>Sign Up</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "#f0f4f8",
		padding: 20,
	},
	heading: {
		fontSize: 32,
		fontWeight: "800",
		color: "#0a7ea4",
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
		backgroundColor: "#0a7ea4",
		borderRadius: 10,
		paddingVertical: 16,
		paddingHorizontal: 30,
		marginBottom: 20,
		width: "80%",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.15,
		shadowRadius: 4,
		elevation: 5,
	},
	icon: {
		marginRight: 10,
	},
	buttonText: {
		color: "#fff",
		fontSize: 18,
		fontWeight: "bold",
	},
});
