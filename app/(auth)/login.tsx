import { router } from "expo-router";
import { useState } from "react";
import {
	KeyboardAvoidingView,
	Platform,
	ScrollView,
	StyleSheet,
} from "react-native";
import {
	ThemedText,
	ThemedTextInput,
	ThemedTouchableOpacity,
	ThemedView,
} from "../components";
import { useTheme } from "../context/themeContext";
import { useAuthStore } from "../store/authStore";

interface LoginForm {
	email: string;
	password: string;
}

const Login = () => {
	const { login } = useAuthStore();
	const { isDark } = useTheme();
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
			try {
				const { error } = await login(
					formData.email,
					formData.password
				);
				if (error) {
					setErrors({
						password: "Invalid email or password",
					});
				} else {
					router.replace("/(dashboard)/home");
				}
			} catch (error) {
				console.log("Error logging in:", error);
			}
		}
	};

	return (
		<KeyboardAvoidingView
			style={[
				styles.container,
				{ backgroundColor: isDark ? "#000" : "#fff" },
			]}
			behavior={Platform.OS === "ios" ? "padding" : "height"}
		>
			<ScrollView contentContainerStyle={styles.scrollContainer}>
				<ThemedView style={styles.formContainer}>
					<ThemedText style={styles.title}>Login</ThemedText>

					<ThemedView style={styles.inputContainer}>
						<ThemedText style={styles.label}>Email</ThemedText>
						<ThemedTextInput
							style={[
								styles.input,
								errors.email && styles.inputError,
							]}
							placeholder="Enter your email"
							value={formData.email}
							onChangeText={(text: string) =>
								setFormData({ ...formData, email: text })
							}
							keyboardType="email-address"
							autoCapitalize="none"
							autoComplete="email"
							placeholderTextColor="#999"
						/>
						{errors.email && (
							<ThemedText style={styles.errorText}>
								{errors.email}
							</ThemedText>
						)}
					</ThemedView>

					<ThemedView style={styles.inputContainer}>
						<ThemedText style={styles.label}>Password</ThemedText>
						<ThemedTextInput
							style={[
								styles.input,
								errors.password && styles.inputError,
							]}
							placeholder="Enter your password"
							value={formData.password}
							onChangeText={(text: string) =>
								setFormData({ ...formData, password: text })
							}
							secureTextEntry
							placeholderTextColor="#999"
						/>
						{errors.password && (
							<ThemedText style={styles.errorText}>
								{errors.password}
							</ThemedText>
						)}
					</ThemedView>

					<ThemedTouchableOpacity
						style={styles.submitButton}
						onPress={handleSubmit}
					>
						<ThemedText style={styles.submitButtonText}>
							Log In
						</ThemedText>
					</ThemedTouchableOpacity>

					<ThemedTouchableOpacity
						style={styles.registerLink}
						onPress={() => router.push("/(auth)/register")}
					>
						<ThemedText style={styles.registerLinkText}>
							Don't have an account? Register here
						</ThemedText>
					</ThemedTouchableOpacity>
				</ThemedView>
			</ScrollView>
		</KeyboardAvoidingView>
	);
};

export default Login;

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	scrollContainer: {
		flexGrow: 1,
		justifyContent: "center",
	},
	formContainer: {
		padding: 20,
		marginHorizontal: 20,
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
	},
	input: {
		borderWidth: 1,
		borderRadius: 8,
		padding: 12,
		fontSize: 16,
	},
	inputError: {
		borderColor: "#ff3b30",
	},
	errorText: {
		fontSize: 14,
		marginTop: 5,
	},
	submitButton: {
		borderRadius: 8,
		padding: 16,
		alignItems: "center",
		marginTop: 10,
	},
	submitButtonText: {
		fontSize: 18,
		fontWeight: "bold",
	},
	registerLink: {
		marginTop: 20,
		alignItems: "center",
	},
	registerLinkText: {
		fontSize: 16,
	},
});
