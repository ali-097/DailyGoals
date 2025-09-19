import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, ScrollView, StyleSheet } from "react-native";
import { ThemedText, ThemedView } from "../../components";
import { supabase } from "../../lib/supabase";

interface Goal {
	id: string;
	title: string;
	description: string;
	priority: "low" | "medium" | "high";
	deadline: string;
}

const GoalDetails = () => {
	const { id } = useLocalSearchParams();
	const [goal, setGoal] = useState<Goal | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchGoal = async () => {
			try {
				const { data, error } = await supabase
					.from("goals")
					.select("*")
					.eq("id", id)
					.single();

				if (error) throw error;
				setGoal(data);
			} catch (err) {
				setError(
					err instanceof Error ? err.message : "Failed to fetch goal"
				);
			} finally {
				setLoading(false);
			}
		};

		if (id) {
			fetchGoal();
		}
	}, [id]);

	const formatDate = (dateString: string) => {
		return new Date(dateString).toLocaleDateString("en-US", {
			year: "numeric",
			month: "long",
			day: "numeric",
		});
	};

	const getPriorityColor = (priority: string) => {
		switch (priority) {
			case "high":
				return "error";
			case "medium":
				return "warning";
			case "low":
				return "success";
			default:
				return "primary";
		}
	};

	if (loading) {
		return (
			<ThemedView variant="background" style={styles.container}>
				<ActivityIndicator size="large" />
				<ThemedText variant="secondary" style={styles.loadingText}>
					Loading goal details...
				</ThemedText>
			</ThemedView>
		);
	}

	if (error) {
		return (
			<ThemedView variant="background" style={styles.container}>
				<ThemedText variant="error" size="lg">
					Error: {error}
				</ThemedText>
			</ThemedView>
		);
	}

	if (!goal) {
		return (
			<ThemedView variant="background" style={styles.container}>
				<ThemedText variant="secondary" size="lg">
					Goal not found
				</ThemedText>
			</ThemedView>
		);
	}

	return (
		<ThemedView variant="background" style={styles.container}>
			<ScrollView contentContainerStyle={styles.scrollContent}>
				<ThemedView
					variant="card"
					elevation="md"
					borderRadius="lg"
					style={styles.card}
				>
					<ThemedText
						variant="primary"
						size="xxl"
						weight="bold"
						style={styles.title}
					>
						{goal.title}
					</ThemedText>

					<ThemedView style={styles.detailRow}>
						<ThemedText
							variant="secondary"
							size="md"
							weight="semibold"
						>
							Priority:
						</ThemedText>
						<ThemedText
							variant={getPriorityColor(goal.priority)}
							size="md"
							weight="bold"
							style={styles.priorityText}
						>
							{goal.priority.toUpperCase()}
						</ThemedText>
					</ThemedView>

					<ThemedView style={styles.detailRow}>
						<ThemedText
							variant="secondary"
							size="md"
							weight="semibold"
						>
							Deadline:
						</ThemedText>
						<ThemedText variant="primary" size="md">
							{formatDate(goal.deadline)}
						</ThemedText>
					</ThemedView>

					<ThemedView style={styles.descriptionContainer}>
						<ThemedText
							variant="secondary"
							size="md"
							weight="semibold"
							style={styles.descriptionLabel}
						>
							Description:
						</ThemedText>
						<ThemedText
							variant="primary"
							size="md"
							lineHeight="relaxed"
							style={styles.description}
						>
							{goal.description}
						</ThemedText>
					</ThemedView>
				</ThemedView>
			</ScrollView>
		</ThemedView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 16,
	},
	scrollContent: {
		flexGrow: 1,
	},
	loadingText: {
		marginTop: 16,
		textAlign: "center",
	},
	card: {
		padding: 20,
		marginBottom: 16,
	},
	title: {
		marginBottom: 20,
		textAlign: "center",
	},
	detailRow: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		marginBottom: 16,
		paddingVertical: 8,
		paddingHorizontal: 12,
		backgroundColor: "rgba(0,0,0,0.05)",
		borderRadius: 8,
	},
	priorityText: {
		textTransform: "uppercase",
		letterSpacing: 1,
	},
	descriptionContainer: {
		marginTop: 8,
	},
	descriptionLabel: {
		marginBottom: 8,
	},
	description: {
		lineHeight: 24,
	},
});

export default GoalDetails;
