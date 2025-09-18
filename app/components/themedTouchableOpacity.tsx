import { TouchableOpacity, TouchableOpacityProps } from "react-native";
import { useTheme } from "../context/themeContext";

interface ThemedTouchableOpacityProps extends TouchableOpacityProps {
	variant?: "primary" | "secondary" | "surface" | "outline" | "ghost";
	size?: "sm" | "md" | "lg";
	disabled?: boolean;
}

export const ThemedTouchableOpacity: React.FC<ThemedTouchableOpacityProps> = ({
	variant = "primary",
	size = "md",
	disabled = false,
	style,
	...props
}) => {
	const { theme } = useTheme();

	const variantStyles = {
		primary: {
			backgroundColor: disabled
				? theme.colors.disabled
				: theme.colors.primary,
			borderColor: theme.colors.primary,
		},
		secondary: {
			backgroundColor: disabled
				? theme.colors.disabled
				: theme.colors.secondary,
			borderColor: theme.colors.secondary,
		},
		surface: {
			backgroundColor: disabled
				? theme.colors.disabled
				: theme.colors.surface,
			borderColor: theme.colors.border,
		},
		outline: {
			backgroundColor: "transparent",
			borderColor: disabled
				? theme.colors.disabled
				: theme.colors.primary,
			borderWidth: 1,
		},
		ghost: {
			backgroundColor: "transparent",
			borderColor: "transparent",
		},
	};

	const sizeStyles = {
		sm: {
			paddingHorizontal: theme.spacing.sm,
			paddingVertical: theme.spacing.xs,
			borderRadius: theme.borderRadius.sm,
		},
		md: {
			paddingHorizontal: theme.spacing.md,
			paddingVertical: theme.spacing.sm,
			borderRadius: theme.borderRadius.md,
		},
		lg: {
			paddingHorizontal: theme.spacing.lg,
			paddingVertical: theme.spacing.md,
			borderRadius: theme.borderRadius.lg,
		},
	};

	return (
		<TouchableOpacity
			style={[
				variantStyles[variant],
				sizeStyles[size],
				disabled && { opacity: 0.6 },
				style,
			]}
			disabled={disabled}
			{...props}
		/>
	);
};
