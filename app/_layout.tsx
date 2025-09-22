import { Stack } from "expo-router";
import { useEffect, useState } from "react";
import ThemeProvider from "./context/themeContext";
import { useAuthStore } from "./store/authStore";

export default function RootLayout() {
	const { isAuthenticated } = useAuthStore();
	const [isLayoutReady, setIsLayoutReady] = useState(false);

	useEffect(() => {
		const timer = setTimeout(() => {
			setIsLayoutReady(true);
		}, 100);
		return () => clearTimeout(timer);
	}, [isLayoutReady]);

	if (!isLayoutReady) {
		return null;
	}

	return (
		<ThemeProvider>
			<Stack>
				<Stack.Protected guard={isAuthenticated}>
					<Stack.Screen
						name="(dashboard)"
						options={{ headerShown: false }}
					/>
					<Stack.Screen
						name="(forms)"
						options={{ headerShown: false }}
					/>
				</Stack.Protected>
				<Stack.Screen name="index" options={{ headerShown: false }} />
				<Stack.Screen name="(auth)" options={{ headerShown: false }} />
			</Stack>
		</ThemeProvider>
	);
}
