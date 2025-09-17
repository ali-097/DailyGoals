import { Stack } from "expo-router";

export default function RootLayout() {
	return (
		<Stack>
			<Stack.Screen name="index" options={{ headerShown: false }} />
			<Stack.Screen
				name="forms/addgoal"
				options={{ title: "Add Goal" }}
			/>
			<Stack.Screen name="(auth)" options={{ headerShown: false }} />
			<Stack.Screen name="(dashboard)" options={{ headerShown: false }} />
			<Stack.Screen name="(forms)" options={{ headerShown: false }} />
		</Stack>
	);
}
