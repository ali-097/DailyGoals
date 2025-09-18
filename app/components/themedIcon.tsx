import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { useTheme } from "../context/themeContext";

interface ThemedIconProps {
	name: keyof typeof Ionicons.glyphMap;
	size?: number;
	color?:
		| "primary"
		| "secondary"
		| "text"
		| "textSecondary"
		| "error"
		| "success";
	style?: any;
}

export const ThemedIcon: React.FC<ThemedIconProps> = ({
	name,
	size = 24,
	color = "text",
	style,
}) => {
	const { theme } = useTheme();

	const colorMap = {
		primary: theme.colors.primary,
		secondary: theme.colors.secondary,
		text: theme.colors.text,
		textSecondary: theme.colors.textSecondary,
		error: theme.colors.error,
		success: theme.colors.success,
	};

	return (
		<Ionicons
			name={name}
			size={size}
			color={colorMap[color]}
			style={style}
		/>
	);
};
