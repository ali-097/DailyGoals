import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useContext, useEffect, useState } from "react";
import { useColorScheme } from "react-native";
import { darkTheme, lightTheme, Theme } from "../theme";

interface ThemeContextType {
	theme: Theme;
	isDark: boolean;
	toggleTheme: () => void;
}

const themeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
	const context = useContext(themeContext);
	if (!context) {
		throw new Error("useTheme must be used within a ThemeProvider");
	}
	return context;
};

const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
	const systemTheme = useColorScheme();
	const [themeType, setThemeType] = useState<"light" | "dark">(
		systemTheme === "dark" ? "dark" : "light"
	);

	const theme = themeType === "light" ? lightTheme : darkTheme;
	const isDark = themeType === "dark";

	const toggleTheme = async () => {
		const newTheme = themeType === "light" ? "dark" : "light";
		setThemeType(newTheme);
		try {
			await AsyncStorage.setItem("user-theme", newTheme);
		} catch (error) {
			console.log("Error saving theme to storage:", error);
		}
	};

	useEffect(() => {
		const loadTheme = async () => {
			try {
				const storedTheme = await AsyncStorage.getItem("user-theme");
				if (storedTheme === "light" || storedTheme === "dark") {
					setThemeType(storedTheme);
				} else if (systemTheme) {
					setThemeType(systemTheme);
				}
			} catch (error) {
				console.log("Error loading theme from storage:", error);
				if (systemTheme) {
					setThemeType(systemTheme);
				}
			}
		};
		loadTheme();
	}, [systemTheme]);

	return (
		<themeContext.Provider value={{ theme, isDark, toggleTheme }}>
			{children}
		</themeContext.Provider>
	);
};

export default ThemeProvider;
