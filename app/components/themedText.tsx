import { Text, TextProps } from "react-native";
import { useTheme } from "../context/themeContext";

interface ThemedTextProps extends TextProps {
	variant?: "primary" | "secondary";
}

export const ThemedText: React.FC<ThemedTextProps> = ({
	variant = "primary",
	style,
	...props
}) => {
	const { theme } = useTheme();

	console.log("ThemedText re-rendered with variant:", variant);

	const variantStyles = {
		primary: {
			color: theme.colors.text,
			backgroundColor: theme.colors.background,
		},
		secondary: {
			color: theme.colors.textSecondary,
			backgroundColor: theme.colors.background,
		},
	};

	return <Text style={[variantStyles[variant], style]} {...props} />;
};
