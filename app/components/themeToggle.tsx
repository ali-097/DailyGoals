import React from "react";
import { useTheme } from "../context/themeContext";
import { ThemedIcon } from "./themedIcon";
import { ThemedText } from "./themedText";
import { ThemedTouchableOpacity } from "./themedTouchableOpacity";

export const ThemeToggle: React.FC<{ compact?: boolean }> = ({
	compact = false,
}) => {
	const { isDark, toggleTheme } = useTheme();

	if (compact) {
		return (
			<ThemedTouchableOpacity
				variant="ghost"
				size="sm"
				onPress={toggleTheme}
				style={{
					flexDirection: "row",
					alignItems: "center",
					justifyContent: "center",
					paddingHorizontal: 12,
					paddingVertical: 6,
				}}
			>
				<ThemedIcon
					name={isDark ? "sunny-outline" : "moon-outline"}
					size={18}
					color="primary"
					style={{ marginRight: 6 }}
				/>
				<ThemedText
					variant="primary"
					weight="medium"
					style={{ fontSize: 14 }}
				>
					{isDark ? "Light" : "Dark"}
				</ThemedText>
			</ThemedTouchableOpacity>
		);
	}

	return (
		<ThemedTouchableOpacity
			variant="outline"
			size="md"
			onPress={toggleTheme}
			style={{
				flexDirection: "row",
				alignItems: "center",
				justifyContent: "center",
				paddingHorizontal: 16,
			}}
		>
			<ThemedIcon
				name={isDark ? "sunny-outline" : "moon-outline"}
				size={20}
				color="primary"
				style={{ marginRight: 8 }}
			/>
			<ThemedText variant="primary" weight="medium">
				{isDark ? "Light Mode" : "Dark Mode"}
			</ThemedText>
		</ThemedTouchableOpacity>
	);
};
