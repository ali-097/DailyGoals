import { View, ViewProps } from "react-native";
import { useTheme } from "../context/themeContext";

interface ThemedViewProps extends ViewProps {
	variant?: "background" | "surface" | "primary";
}

export const ThemedView: React.FC<ThemedViewProps> = ({
	variant = "background",
	style,
	...props
}) => {
	const { theme } = useTheme();

	const variantStyles = {
		background: { backgroundColor: theme.colors.background },
		surface: { backgroundColor: theme.colors.surface },
		primary: { backgroundColor: theme.colors.primary },
	};

	console.log("ThemedView rendered with variant:", variant);

	return <View style={[variantStyles[variant], style]} {...props} />;
};
