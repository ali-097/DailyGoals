import { Tabs } from "expo-router";
import React from "react";
import { StyleSheet } from "react-native";

const _layout = () => {
	return (
		<Tabs screenOptions={{ headerShown: false }}>
			<Tabs.Screen name="home" options={{ title: "Home" }} />
			<Tabs.Screen name="profile" options={{ title: "Profile" }} />
		</Tabs>
	);
};

export default _layout;

const styles = StyleSheet.create({});
