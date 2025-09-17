import { router } from "expo-router";
import { useState } from "react";
import {
	KeyboardAvoidingView,
	Platform,
	ScrollView,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from "react-native";
import { supabase } from "../lib/supabase";

interface LoginForm {
	email: string;
	password: string;
}

const Login = () => {
	const [formData, setFormData] = useState<LoginForm>({
		email: "",
		password: "",
	});

	const [errors, setErrors] = useState<Partial<LoginForm>>({});

	const validateForm = () => {
		const newErrors: Partial<LoginForm> = {};

		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!formData.email.trim()) {
			newErrors.email = "Email is required";
		} else if (!emailRegex.test(formData.email)) {
			newErrors.email = "Please enter a valid email";
		}

		if (!formData.password) {
			newErrors.password = "Password is required";
		}

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const handleSubmit = async () => {
		if (validateForm()) {
			const { data, error } = await supabase.auth.signInWithPassword({
				email: formData.email,
				password: formData.password,
			});
			if (error) {
				console.log("Error logging in:", error.message);
				setErrors({ password: error.message });
				return;
			}
			console.log("Login successful:", data);
			router.push("/(dashboard)/home");
		}
	};

	return (
		<KeyboardAvoidingView
			style={styles.container}
			behavior={Platform.OS === "ios" ? "padding" : "height"}
		>
			<ScrollView contentContainerStyle={styles.scrollContainer}>
				<View style={styles.formContainer}>
					<Text style={styles.title}>Login</Text>

					<View style={styles.inputContainer}>
						<Text style={styles.label}>Email</Text>
						<TextInput
							style={[
								styles.input,
								errors.email && styles.inputError,
							]}
							placeholder="Enter your email"
							value={formData.email}
							onChangeText={(text) =>
								setFormData({ ...formData, email: text })
							}
							keyboardType="email-address"
							autoCapitalize="none"
							autoComplete="email"
							placeholderTextColor="#999"
						/>
						{errors.email && (
							<Text style={styles.errorText}>{errors.email}</Text>
						)}
					</View>

					<View style={styles.inputContainer}>
						<Text style={styles.label}>Password</Text>
						<TextInput
							style={[
								styles.input,
								errors.password && styles.inputError,
							]}
							placeholder="Enter your password"
							value={formData.password}
							onChangeText={(text) =>
								setFormData({ ...formData, password: text })
							}
							secureTextEntry
							placeholderTextColor="#999"
						/>
						{errors.password && (
							<Text style={styles.errorText}>
								{errors.password}
							</Text>
						)}
					</View>

					<TouchableOpacity
						style={styles.submitButton}
						onPress={handleSubmit}
					>
						<Text style={styles.submitButtonText}>Log In</Text>
					</TouchableOpacity>

					<TouchableOpacity
						style={styles.registerLink}
						onPress={() => router.push("/(auth)/register")}
					>
						<Text style={styles.registerLinkText}>
							Don't have an account? Register here
						</Text>
					</TouchableOpacity>
				</View>
			</ScrollView>
		</KeyboardAvoidingView>
	);
};

export default Login;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#f5f5f5",
	},
	scrollContainer: {
		flexGrow: 1,
		justifyContent: "center",
	},
	formContainer: {
		padding: 20,
		marginHorizontal: 20,
		backgroundColor: "#fff",
		borderRadius: 12,
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.1,
		shadowRadius: 3.84,
		elevation: 5,
	},
	title: {
		fontSize: 28,
		fontWeight: "bold",
		color: "#333",
		marginBottom: 30,
		textAlign: "center",
	},
	inputContainer: {
		marginBottom: 20,
	},
	label: {
		fontSize: 16,
		fontWeight: "600",
		marginBottom: 8,
		color: "#333",
	},
	input: {
		backgroundColor: "#fff",
		borderWidth: 1,
		borderColor: "#ddd",
		borderRadius: 8,
		padding: 12,
		fontSize: 16,
		color: "#333",
	},
	inputError: {
		borderColor: "#ff3b30",
	},
	errorText: {
		color: "#ff3b30",
		fontSize: 14,
		marginTop: 5,
	},
	submitButton: {
		backgroundColor: "#0a7ea4",
		borderRadius: 8,
		padding: 16,
		alignItems: "center",
		marginTop: 10,
	},
	submitButtonText: {
		color: "#fff",
		fontSize: 18,
		fontWeight: "bold",
	},
	registerLink: {
		marginTop: 20,
		alignItems: "center",
	},
	registerLinkText: {
		color: "#0a7ea4",
		fontSize: 16,
	},
});
