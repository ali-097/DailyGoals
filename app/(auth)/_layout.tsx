import { router, Stack } from "expo-router";
import { useEffect } from "react";
import { StyleSheet } from "react-native";
import { supabase } from "../lib/supabase";

const _layout = () => {
	useEffect(() => {
		const checkAuth = async () => {
			const {
				data: { user },
			} = await supabase.auth.getUser();
			if (user) {
				router.replace("/(dashboard)/home");
			}
		};
		checkAuth();
	}, []);

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
			<Stack.Screen
				name="login"
				options={{ title: "Login Form", headerLeft: () => null }}
			/>
			<Stack.Screen
				name="register"
				options={{ title: "Signup Form", headerLeft: () => null }}
			/>
		</Stack>
	);
};

export default _layout;

const styles = StyleSheet.create({});
