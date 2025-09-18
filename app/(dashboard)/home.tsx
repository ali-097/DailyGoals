import { Link } from "expo-router";
import { useEffect, useState } from "react";
import { Alert, FlatList, StyleSheet } from "react-native";
import { ThemedText, ThemedTouchableOpacity, ThemedView } from "../components";
import { supabase } from "../lib/supabase";
import { Goal } from "../types/goal";
import { formatDate } from "../util/utilfuncs";

interface Goals extends Goal {
	id: number;
}

const goals = () => {
	const [goalList, setGoalList] = useState<Goals[]>([]);
	useEffect(() => {
		const fetchData = async () => {
			const res = await supabase
				.from("goals")
				.select("*")
				.order("created_at", { ascending: false });
			const goalsData = res.data;
			if (goalsData) {
				setGoalList(
					goalsData.map(({ created_at, user_id, ...rest }) => rest)
				);
			}
		};
		fetchData();
	}, []);

	const deleteGoal = async (id: number) => {
		const { error } = await supabase.from("goals").delete().eq("id", id);
		if (error) {
			Alert.alert("Error", "Failed to delete the goal.");
			return;
		}
		setGoalList((prevGoals) => prevGoals.filter((goal) => goal.id !== id));
	};

	return (
		<ThemedView style={styles.container}>
			<Link href="/(forms)/goalForm" asChild>
				<ThemedTouchableOpacity style={styles.addButton}>
					<ThemedText style={styles.addButtonText}>
						+ Add Goal
					</ThemedText>
				</ThemedTouchableOpacity>
			</Link>

			<FlatList
				data={goalList}
				keyExtractor={(item) => item.id.toString()}
				contentContainerStyle={{ paddingBottom: 16 }}
				renderItem={({ item }) => (
					<ThemedView style={styles.card}>
						<ThemedView style={{ marginBottom: 8 }}>
							<ThemedText style={styles.cardTitle}>
								{item.title}
							</ThemedText>
							<ThemedText style={styles.cardDescription}>
								{item.description}
							</ThemedText>
							<ThemedText style={styles.cardPriority}>
								Priority: {item.priority}
							</ThemedText>
							<ThemedText>
								Deadline: {formatDate(new Date(item.deadline))}
							</ThemedText>
						</ThemedView>

						<ThemedView style={styles.buttonRow}>
							<Link
								href={{
									pathname: "/(forms)/goalForm",
									params: { id: item.id },
								}}
								asChild
							>
								<ThemedTouchableOpacity
									style={styles.editButton}
								>
									<ThemedText style={styles.buttonText}>
										Edit
									</ThemedText>
								</ThemedTouchableOpacity>
							</Link>

							<ThemedTouchableOpacity
								style={styles.deleteButton}
								onPress={() =>
									Alert.alert(
										"Delete Goal",
										"Are you sure you want to delete this goal?",
										[
											{ text: "Cancel", style: "cancel" },
											{
												text: "Delete",
												style: "destructive",
												onPress: () => {
													deleteGoal(item.id);
												},
											},
										]
									)
								}
							>
								<ThemedText style={styles.buttonText}>
									Delete
								</ThemedText>
							</ThemedTouchableOpacity>
						</ThemedView>
					</ThemedView>
				)}
			/>
		</ThemedView>
	);
};

export default goals;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingVertical: 70,
		paddingHorizontal: 30,
	},
	addButton: {
		paddingVertical: 12,
		paddingHorizontal: 20,
		borderRadius: 8,
		alignItems: "center",
		marginBottom: 16,
	},
	addButtonText: {
		fontSize: 16,
		fontWeight: "bold",
	},
	card: {
		borderRadius: 10,
		padding: 16,
		marginBottom: 12,
		elevation: 2,
	},
	cardTitle: {
		fontSize: 18,
		fontWeight: "bold",
	},
	cardDescription: {
		fontSize: 14,
		marginTop: 4,
	},
	cardPriority: {
		marginTop: 6,
		fontSize: 13,
	},
	buttonRow: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginTop: 12,
	},
	editButton: {
		paddingVertical: 8,
		paddingHorizontal: 16,
		borderRadius: 6,
	},
	deleteButton: {
		paddingVertical: 8,
		paddingHorizontal: 16,
		borderRadius: 6,
	},
	buttonText: {
		fontWeight: "bold",
		fontSize: 14,
	},
});
