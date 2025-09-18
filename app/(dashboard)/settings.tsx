import { router } from "expo-router";
import { StyleSheet } from "react-native";
import {
	ThemedIcon,
	ThemedText,
	ThemedTouchableOpacity,
	ThemedView,
	ThemeToggle,
} from "../components";
import { supabase } from "../lib/supabase";

const settings = () => {
	const signOut = async () => {
		try {
			await supabase.auth.signOut();
			router.replace("/(auth)/login");
		} catch (error) {
			console.log("Error signing out:", error);
		}
	};

	return (
		<ThemedView style={styles.container}>
			<ThemedView style={styles.header}>
				<ThemedIcon name="settings-outline" size={32} color="primary" />
				<ThemedText style={styles.title}>Settings</ThemedText>
			</ThemedView>

			<ThemedView style={styles.content}>
				<ThemedView style={styles.section}>
					<ThemedText style={styles.sectionTitle}>
						Appearance
					</ThemedText>
					<ThemedView style={styles.settingItem}>
						<ThemedView style={styles.settingInfo}>
							<ThemedIcon
								name="color-palette-outline"
								size={24}
								color="textSecondary"
							/>
							<ThemedView style={styles.settingText}>
								<ThemedText style={styles.settingLabel}>
									Theme
								</ThemedText>
								<ThemedText style={styles.settingDescription}>
									Choose your preferred theme
								</ThemedText>
							</ThemedView>
						</ThemedView>
						<ThemeToggle compact />
					</ThemedView>
				</ThemedView>

				<ThemedView style={styles.section}>
					<ThemedText style={styles.sectionTitle}>Account</ThemedText>
					<ThemedTouchableOpacity
						style={[
							styles.settingItem,
							{ backgroundColor: "transparent" },
						]}
						onPress={signOut}
					>
						<ThemedView style={styles.settingInfo}>
							<ThemedIcon
								name="log-out-outline"
								size={24}
								color="error"
							/>
							<ThemedView style={styles.settingText}>
								<ThemedText style={styles.settingLabel}>
									Sign Out
								</ThemedText>
								<ThemedText style={styles.settingDescription}>
									Log out of your account
								</ThemedText>
							</ThemedView>
						</ThemedView>
						<ThemedIcon
							name="chevron-forward"
							size={20}
							color="textSecondary"
						/>
					</ThemedTouchableOpacity>
				</ThemedView>

				<ThemedView style={styles.section}>
					<ThemedText style={styles.sectionTitle}>About</ThemedText>
					<ThemedView style={styles.aboutItem}>
						<ThemedText style={styles.versionText}>
							DailyGoals v1.0.0
						</ThemedText>
					</ThemedView>
				</ThemedView>
			</ThemedView>
		</ThemedView>
	);
};

export default settings;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingTop: 60,
	},
	header: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		paddingHorizontal: 20,
		paddingBottom: 30,
	},
	title: {
		fontSize: 28,
		fontWeight: "bold",
		marginLeft: 12,
	},
	content: {
		flex: 1,
		paddingHorizontal: 20,
	},
	section: {
		marginBottom: 32,
	},
	sectionTitle: {
		fontSize: 18,
		fontWeight: "600",
		marginBottom: 16,
		textTransform: "uppercase",
		letterSpacing: 0.5,
	},
	settingItem: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		paddingVertical: 16,
		paddingHorizontal: 16,
		borderRadius: 12,
		marginBottom: 8,
	},
	settingInfo: {
		flexDirection: "row",
		alignItems: "center",
		flex: 1,
	},
	settingText: {
		marginLeft: 12,
		flex: 1,
	},
	settingLabel: {
		fontSize: 16,
		fontWeight: "500",
		marginBottom: 2,
	},
	settingDescription: {
		fontSize: 14,
	},
	aboutItem: {
		paddingVertical: 20,
		paddingHorizontal: 16,
		borderRadius: 12,
		alignItems: "center",
	},
	versionText: {
		fontSize: 16,
		fontWeight: "500",
		marginBottom: 4,
	},
});
