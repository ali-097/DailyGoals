import { Text, TextProps } from "react-native";
import { useTheme } from "../context/themeContext";

interface ThemedTextProps extends TextProps {
	variant?:
		| "primary"
		| "secondary"
		| "hint"
		| "error"
		| "success"
		| "warning"
		| "info";
	size?: "xs" | "sm" | "md" | "lg" | "xl" | "xxl" | "xxxl";
	weight?: "light" | "normal" | "medium" | "semibold" | "bold";
	lineHeight?: "tight" | "normal" | "relaxed";
}

export const ThemedText: React.FC<ThemedTextProps> = ({
	variant = "primary",
	size = "md",
	weight = "normal",
	lineHeight = "normal",
	style,
	...props
}) => {
	const { theme } = useTheme();

	const variantStyles = {
		primary: { color: theme.colors.text },
		secondary: { color: theme.colors.textSecondary },
		hint: { color: theme.colors.textHint },
		error: { color: theme.colors.error },
		success: { color: theme.colors.success },
		warning: { color: theme.colors.warning },
		info: { color: theme.colors.info },
	};

	const sizeStyles = {
		fontSize: theme.typography.fontSize[size],
	};

	const weightStyles = {
		fontWeight: theme.typography.fontWeight[weight],
	};

	const lineHeightStyles = {
		lineHeight:
			theme.typography.fontSize[size] *
			theme.typography.lineHeight[lineHeight],
	};

	return (
		<Text
			style={[
				variantStyles[variant],
				sizeStyles,
				weightStyles,
				lineHeightStyles,
				style,
			]}
			{...props}
		/>
	);
};
