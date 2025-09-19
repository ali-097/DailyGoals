import { router, Stack } from "expo-router";
import React, { useEffect } from "react";
import { StyleSheet } from "react-native";
import { useAuth } from "../hooks/useAuth";

const _layout = () => {
	const isAuthenticated = useAuth();

	useEffect(() => {
		if (isAuthenticated === false) {
			router.replace("/(auth)/login");
		}
	}, [isAuthenticated]);

	return (
		<Stack screenOptions={{ headerShown: false }}>
			{/* <Stack.Screen name="addgoal" options={{ headerTitle: "" }} /> */}
		</Stack>
	);
};

export default _layout;

const styles = StyleSheet.create({});
