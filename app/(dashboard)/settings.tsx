import { router } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import { ThemedText } from "../components/themedtext";
import { useTheme } from "../context/themeContext";
import { supabase } from "../lib/supabase";

const settings = () => {
	const { toggleTheme } = useTheme();

	const signOut = async () => {
		try {
			await supabase.auth.signOut();
			router.replace("/(auth)/login");
		} catch (error) {
			console.log("Error signing out:", error);
		}
	};
	return (
		<View style={styles.container}>
			<Text onPress={signOut}>Sign Out</Text>
			<Text onPress={toggleTheme}>Toggle Theme</Text>
			<ThemedText variant="secondary" style={{ marginTop: 4 }}>
				10/100
			</ThemedText>
		</View>
	);
};

export default settings;

const styles = StyleSheet.create({
	container: { flex: 1, justifyContent: "center", alignItems: "center" },
});
