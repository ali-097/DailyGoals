import { router, Stack } from "expo-router";
import React, { useEffect } from "react";
import { StyleSheet } from "react-native";
import { supabase } from "../lib/supabase";

const _layout = () => {
	useEffect(() => {
		const checkAuth = async () => {
			const {
				data: { user },
			} = await supabase.auth.getUser();
			if (!user) {
				router.replace("/(auth)/login");
			}
		};
		checkAuth();
	}, []);

	return (
		<Stack screenOptions={{ headerShown: false }}>
			{/* <Stack.Screen name="addgoal" options={{ headerTitle: "" }} /> */}
		</Stack>
	);
};

export default _layout;

const styles = StyleSheet.create({});
