import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useContext, useEffect, useState } from "react";
import { StyleSheet, useColorScheme } from "react-native";
import { darkTheme, lightTheme } from "../theme";

interface ThemeContextType {
	theme: "light" | "dark";
	toggleTheme: () => void;
}

const themeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
	const context = useContext(themeContext);
	if (!context) {
		throw new Error("useTheme must be used within a ThemeProvider");
	}
	return {
		theme: context.theme === "light" ? lightTheme : darkTheme,
		toggleTheme: context.toggleTheme,
	};
};

const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
	const [theme, setTheme] = useState<"light" | "dark">(
		useColorScheme() || "light"
	);

	const toggleTheme = async () => {
		setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
		try {
			await AsyncStorage.setItem(
				"user-theme",
				theme === "light" ? "dark" : "light"
			);
		} catch (error) {
			console.log("Error saving theme to storage:", error);
		}
	};

	useEffect(() => {
		const loadTheme = async () => {
			try {
				const storedTheme = await AsyncStorage.getItem("user-theme");
				if (storedTheme === "light" || storedTheme === "dark") {
					setTheme(storedTheme);
				}
			} catch (error) {
				console.log("Error loading theme from storage:", error);
			}
		};
		loadTheme();
	}, []);

	return (
		<themeContext.Provider value={{ theme, toggleTheme }}>
			{children}
		</themeContext.Provider>
	);
};

export default ThemeProvider;

const styles = StyleSheet.create({});
