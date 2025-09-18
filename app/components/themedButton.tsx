import React from "react";
import { useTheme } from "../context/themeContext";
import { ThemedText } from "./themedText";
import { ThemedTouchableOpacity } from "./themedTouchableOpacity";

interface ThemedButtonProps {
	title: string;
	onPress: () => void;
	variant?: "primary" | "secondary" | "outline" | "ghost";
	size?: "sm" | "md" | "lg";
	disabled?: boolean;
	loading?: boolean;
	style?: any;
	textStyle?: any;
}

export const ThemedButton: React.FC<ThemedButtonProps> = ({
	title,
	onPress,
	variant = "primary",
	size = "md",
	disabled = false,
	loading = false,
	style,
	textStyle,
}) => {
	const { theme } = useTheme();

	const getTextColor = () => {
		if (disabled) return theme.colors.disabledText;
		switch (variant) {
			case "primary":
			case "secondary":
				return theme.colors.text;
			case "outline":
			case "ghost":
				return theme.colors.primary;
			default:
				return theme.colors.text;
		}
	};

	return (
		<ThemedTouchableOpacity
			variant={variant}
			size={size}
			disabled={disabled || loading}
			onPress={onPress}
			style={style}
		>
			<ThemedText
				variant="primary"
				weight="medium"
				style={[{ color: getTextColor() }, textStyle]}
			>
				{loading ? "Loading..." : title}
			</ThemedText>
		</ThemedTouchableOpacity>
	);
};
