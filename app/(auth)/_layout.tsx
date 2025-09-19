import { router } from "expo-router";
import { Stack } from "expo-router/stack";
// import { Drawer } from "expo-router/drawer";
import { useEffect } from "react";
import { StyleSheet } from "react-native";
import { useAuth } from "../hooks/useAuth";

const _layout = () => {
	const isAuthenticated = useAuth();

	useEffect(() => {
		if (isAuthenticated === true) {
			router.replace("/(dashboard)/home");
		}
	}, [isAuthenticated]);

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
		// <GestureHandlerRootView style={{ flex: 1 }}>
		// 	<Drawer>
		// 		<Drawer.Screen name="login" options={{ title: "Login Form" }} />
		// 		<Drawer.Screen
		// 			name="register"
		// 			options={{ title: "Signup Form" }}
		// 		/>
		// 	</Drawer>
		// </GestureHandlerRootView>
	);
};

export default _layout;

const styles = StyleSheet.create({});
