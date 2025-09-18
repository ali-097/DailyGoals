import { Stack } from "expo-router";
import { StyleSheet } from "react-native";

const _layout = () => {
	return (
		<Stack
			screenOptions={{
				headerStyle: {
					backgroundColor: "#0a7ea4",
				},
				headerTintColor: "#fff",
				headerTitleStyle: {
					fontWeight: "bold",
				},
				headerTitleAlign: "center",
			}}
		>
			<Stack.Screen name="login" options={{ title: "Login Form" }} />
			<Stack.Screen name="register" options={{ title: "Signup Form" }} />
		</Stack>
	);
};

export default _layout;

const styles = StyleSheet.create({});
