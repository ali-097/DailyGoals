import { TextInput, TextInputProps } from "react-native";
import { useTheme } from "../context/themeContext";

interface ThemedTextInputProps extends TextInputProps {
	variant?: "default" | "outlined" | "filled";
	error?: boolean;
}

export const ThemedTextInput: React.FC<ThemedTextInputProps> = ({
	variant = "default",
	error = false,
	style,
	placeholderTextColor,
	...props
}) => {
	const { theme } = useTheme();

	const variantStyles = {
		default: {
			backgroundColor: theme.colors.input,
			borderColor: error ? theme.colors.error : theme.colors.inputBorder,
			borderWidth: 1,
			borderRadius: theme.borderRadius.md,
			color: theme.colors.text,
			paddingHorizontal: theme.spacing.md,
			paddingVertical: theme.spacing.sm,
		},
		outlined: {
			backgroundColor: "transparent",
			borderColor: error ? theme.colors.error : theme.colors.border,
			borderWidth: 2,
			borderRadius: theme.borderRadius.md,
			color: theme.colors.text,
			paddingHorizontal: theme.spacing.md,
			paddingVertical: theme.spacing.sm,
		},
		filled: {
			backgroundColor: theme.colors.surfaceVariant,
			borderColor: error ? theme.colors.error : "transparent",
			borderWidth: 1,
			borderRadius: theme.borderRadius.md,
			color: theme.colors.text,
			paddingHorizontal: theme.spacing.md,
			paddingVertical: theme.spacing.sm,
		},
	};

	return (
		<TextInput
			style={[variantStyles[variant], style]}
			placeholderTextColor={
				placeholderTextColor || theme.colors.placeholder
			}
			{...props}
		/>
	);
};
