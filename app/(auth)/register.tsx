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
import { supabase } from "../lib/supabase";

interface RegisterForm {
	username: string;
	email: string;
	password: string;
	confirmPassword: string;
}

const Register = () => {
	const { isDark } = useTheme();
	const [formData, setFormData] = useState<RegisterForm>({
		username: "",
		email: "",
		password: "",
		confirmPassword: "",
	});

	const [errors, setErrors] = useState<Partial<RegisterForm>>({});

	const validateForm = () => {
		const newErrors: Partial<RegisterForm> = {};

		if (!formData.username.trim()) {
			newErrors.username = "Username is required";
		} else if (formData.username.length < 3) {
			newErrors.username = "Username must be at least 3 characters";
		}

		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!formData.email.trim()) {
			newErrors.email = "Email is required";
		} else if (!emailRegex.test(formData.email)) {
			newErrors.email = "Please enter a valid email";
		}

		if (!formData.password) {
			newErrors.password = "Password is required";
		} else if (formData.password.length < 6) {
			newErrors.password = "Password must be at least 6 characters";
		}

		if (formData.password !== formData.confirmPassword) {
			newErrors.confirmPassword = "Passwords do not match";
		}

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const handleSubmit = async () => {
		if (validateForm()) {
			console.log(supabase);
			const { data, error } = await supabase.auth.signUp({
				email: formData.email,
				password: formData.password,
				options: {
					data: {
						username: formData.username,
					},
				},
			});
			if (error) {
				console.error("Error during sign up:", error.message);
				return;
			}
			console.log("User signed up successfully:", data);
			console.log("Form submitted:", formData);
			router.push("/");
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
					<ThemedText style={styles.title}>Create Account</ThemedText>

					<ThemedView style={styles.inputContainer}>
						<ThemedText style={styles.label}>Username</ThemedText>
						<ThemedTextInput
							style={[
								styles.input,
								errors.username && styles.inputError,
							]}
							placeholder="Enter your username"
							value={formData.username}
							onChangeText={(text: string) =>
								setFormData({ ...formData, username: text })
							}
							autoCapitalize="none"
							placeholderTextColor="#999"
						/>
						{errors.username && (
							<ThemedText style={styles.errorText}>
								{errors.username}
							</ThemedText>
						)}
					</ThemedView>

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

					<ThemedView style={styles.inputContainer}>
						<ThemedText style={styles.label}>
							Confirm Password
						</ThemedText>
						<ThemedTextInput
							style={[
								styles.input,
								errors.confirmPassword && styles.inputError,
							]}
							placeholder="Confirm your password"
							value={formData.confirmPassword}
							onChangeText={(text: string) =>
								setFormData({
									...formData,
									confirmPassword: text,
								})
							}
							secureTextEntry
							placeholderTextColor="#999"
						/>
						{errors.confirmPassword && (
							<ThemedText style={styles.errorText}>
								{errors.confirmPassword}
							</ThemedText>
						)}
					</ThemedView>

					<ThemedTouchableOpacity
						style={styles.submitButton}
						onPress={handleSubmit}
					>
						<ThemedText style={styles.submitButtonText}>
							Register
						</ThemedText>
					</ThemedTouchableOpacity>

					<ThemedTouchableOpacity
						style={styles.loginLink}
						onPress={() => router.push("/(auth)/login")}
					>
						<ThemedText style={styles.loginLinkText}>
							Already have an account? Login here
						</ThemedText>
					</ThemedTouchableOpacity>
				</ThemedView>
			</ScrollView>
		</KeyboardAvoidingView>
	);
};

export default Register;

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
	loginLink: {
		marginTop: 20,
		alignItems: "center",
	},
	loginLinkText: {
		fontSize: 16,
	},
});
