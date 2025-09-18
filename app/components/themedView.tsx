import { View, ViewProps } from "react-native";
import { useTheme } from "../context/themeContext";

interface ThemedViewProps extends ViewProps {
	variant?:
		| "background"
		| "surface"
		| "surfaceVariant"
		| "card"
		| "primary"
		| "secondary";
	elevation?: "none" | "sm" | "md" | "lg" | "xl";
	borderRadius?: "sm" | "md" | "lg" | "xl" | "round";
}

export const ThemedView: React.FC<ThemedViewProps> = ({
	variant = "background",
	elevation = "none",
	borderRadius,
	style,
	...props
}) => {
	const { theme } = useTheme();

	const variantStyles = {
		background: { backgroundColor: theme.colors.background },
		surface: { backgroundColor: theme.colors.surface },
		surfaceVariant: { backgroundColor: theme.colors.surfaceVariant },
		card: { backgroundColor: theme.colors.card },
		primary: { backgroundColor: theme.colors.primary },
		secondary: { backgroundColor: theme.colors.secondary },
	};

	const elevationStyles = {
		none: {},
		sm: {
			shadowColor: theme.colors.shadow,
			shadowOffset: { width: 0, height: 1 },
			shadowOpacity: 0.22,
			shadowRadius: 2.22,
			elevation: theme.elevation.sm,
		},
		md: {
			shadowColor: theme.colors.shadow,
			shadowOffset: { width: 0, height: 2 },
			shadowOpacity: 0.25,
			shadowRadius: 3.84,
			elevation: theme.elevation.md,
		},
		lg: {
			shadowColor: theme.colors.shadow,
			shadowOffset: { width: 0, height: 4 },
			shadowOpacity: 0.3,
			shadowRadius: 4.65,
			elevation: theme.elevation.lg,
		},
		xl: {
			shadowColor: theme.colors.shadow,
			shadowOffset: { width: 0, height: 8 },
			shadowOpacity: 0.44,
			shadowRadius: 10.32,
			elevation: theme.elevation.xl,
		},
	};

	const borderRadiusStyles = borderRadius
		? {
				borderRadius: theme.borderRadius[borderRadius],
		  }
		: {};

	return (
		<View
			style={[
				variantStyles[variant],
				elevationStyles[elevation],
				borderRadiusStyles,
				style,
			]}
			{...props}
		/>
	);
};
