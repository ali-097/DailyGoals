import { Ionicons } from "@expo/vector-icons";
import { router, Tabs } from "expo-router";
import React, { useEffect } from "react";
import { StyleSheet } from "react-native";
import { useTheme } from "../context/themeContext";
import { useAuth } from "../hooks/useAuth";

const _layout = () => {
	const { isDark } = useTheme();
	const isAuthenticated = useAuth();

	useEffect(() => {
		if (isAuthenticated === false) {
			router.replace("/(auth)/login");
		}
	}, [isAuthenticated]);

	return (
		<Tabs
			screenOptions={{
				headerShown: false,
				tabBarStyle: {
					backgroundColor: isDark ? "#000" : "#fff",
					borderTopColor: isDark ? "#1C1C1E" : "#E5E5EA",
					height: 60,
					paddingBottom: 5,
					paddingTop: 5,
				},
				tabBarActiveTintColor: "#007AFF",
				tabBarInactiveTintColor: "#8E8E93",
				tabBarLabelStyle: {
					fontSize: 12,
					fontWeight: "600",
				},
			}}
		>
			<Tabs.Screen
				name="home"
				options={{
					title: "Home",
					tabBarIcon: ({ color, size }) => (
						<Ionicons name="home" color={color} size={size} />
					),
				}}
			/>
			<Tabs.Screen
				name="settings"
				options={{
					title: "Settings",
					tabBarIcon: ({ color, size }) => (
						<Ionicons
							name="settings-outline"
							color={color}
							size={size}
						/>
					),
				}}
			/>
		</Tabs>
	);
};

export default _layout;

const styles = StyleSheet.create({});
