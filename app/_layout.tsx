import NetInfo from "@react-native-community/netinfo";
import { Stack } from "expo-router";
import { useEffect, useState } from "react";
import { ThemedText, ThemedView } from "./components";
import ThemeProvider from "./context/themeContext";
import { useAuthStore } from "./store/authStore";

export default function RootLayout() {
	const { isAuthenticated } = useAuthStore();
	const [isLayoutReady, setIsLayoutReady] = useState(false);
	const [isConnected, setIsConnected] = useState(true);

	useEffect(() => {
		const timer = setTimeout(() => {
			setIsLayoutReady(true);
		}, 100);
		return () => clearTimeout(timer);
	}, []);

	useEffect(() => {
		const unsubscribe = NetInfo.addEventListener((state) => {
			setIsConnected(state.isConnected ?? false);
		});

		NetInfo.fetch().then((state) => {
			setIsConnected(state.isConnected ?? false);
		});

		return () => unsubscribe();
	}, []);

	if (!isLayoutReady) {
		return null;
	}

	if (!isConnected) {
		return (
			<ThemeProvider>
				<ThemedView
					variant="background"
					style={{
						flex: 1,
						justifyContent: "center",
						alignItems: "center",
						padding: 20,
					}}
				>
					<ThemedText
						variant="primary"
						size="lg"
						weight="bold"
						style={{ textAlign: "center", marginBottom: 10 }}
					>
						No Internet Connection
					</ThemedText>
					<ThemedText
						variant="secondary"
						size="md"
						style={{ textAlign: "center" }}
					>
						Please check your network settings and try again.
					</ThemedText>
				</ThemedView>
			</ThemeProvider>
		);
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
