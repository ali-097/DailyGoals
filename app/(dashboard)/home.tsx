import { Link } from "expo-router";
import { useEffect, useState } from "react";
import {
	Alert,
	FlatList,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
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
		<View style={styles.container}>
			<Link href="/(forms)/addgoal" asChild>
				<TouchableOpacity style={styles.addButton}>
					<Text style={styles.addButtonText}>+ Add Goal</Text>
				</TouchableOpacity>
			</Link>

			<FlatList
				data={goalList}
				keyExtractor={(item) => item.id.toString()}
				contentContainerStyle={{ paddingBottom: 16 }}
				renderItem={({ item }) => (
					<View style={styles.card}>
						<View style={{ marginBottom: 8 }}>
							<Text style={styles.cardTitle}>{item.title}</Text>
							<Text style={styles.cardDescription}>
								{item.description}
							</Text>
							<Text style={styles.cardPriority}>
								Priority: {item.priority}
							</Text>
							<Text>
								Deadline: {formatDate(new Date(item.deadline))}
							</Text>
						</View>

						<View style={styles.buttonRow}>
							<Link
								href={{
									pathname: "/(forms)/addgoal",
									params: { id: item.id },
								}}
								asChild
							>
								<TouchableOpacity style={styles.editButton}>
									<Text style={styles.buttonText}>Edit</Text>
								</TouchableOpacity>
							</Link>

							<TouchableOpacity
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
								<Text style={styles.buttonText}>Delete</Text>
							</TouchableOpacity>
						</View>
					</View>
				)}
			/>
		</View>
	);
};

export default goals;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingVertical: 70,
		paddingHorizontal: 30,
		backgroundColor: "#fff",
	},
	addButton: {
		backgroundColor: "#0a7ea4",
		paddingVertical: 12,
		paddingHorizontal: 20,
		borderRadius: 8,
		alignItems: "center",
		marginBottom: 16,
	},
	addButtonText: {
		color: "#fff",
		fontSize: 16,
		fontWeight: "bold",
	},
	card: {
		backgroundColor: "#f8f8f8",
		borderRadius: 10,
		padding: 16,
		marginBottom: 12,
		elevation: 2,
	},
	cardTitle: {
		fontSize: 18,
		fontWeight: "bold",
		color: "#333",
	},
	cardDescription: {
		fontSize: 14,
		color: "#555",
		marginTop: 4,
	},
	cardPriority: {
		marginTop: 6,
		color: "#888",
		fontSize: 13,
	},
	buttonRow: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginTop: 12,
	},
	editButton: {
		backgroundColor: "#4CAF50",
		paddingVertical: 8,
		paddingHorizontal: 16,
		borderRadius: 6,
	},
	deleteButton: {
		backgroundColor: "#FF3B30",
		paddingVertical: 8,
		paddingHorizontal: 16,
		borderRadius: 6,
	},
	buttonText: {
		color: "#fff",
		fontWeight: "bold",
		fontSize: 14,
	},
});
