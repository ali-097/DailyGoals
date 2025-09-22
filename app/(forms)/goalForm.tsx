import DateTimePicker from "@react-native-community/datetimepicker";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Alert, Modal, StyleSheet } from "react-native";
import {
	ThemedText,
	ThemedTextInput,
	ThemedTouchableOpacity,
	ThemedView,
} from "../components";
import { supabase } from "../lib/supabase";
import { useAuthStore } from "../store/authStore";
import { Goal } from "../types/goal";

const formatDate = (date: Date): string => {
	return date.toLocaleString("en-US", {
		year: "numeric",
		month: "short",
		day: "numeric",
	});
};

const goalForm = () => {
	const { id } = useLocalSearchParams();
	const { user_id } = useAuthStore();
	const [formData, setFormData] = useState<Goal>({
		title: "",
		description: "",
		deadline: new Date(),
		priority: "low",
	});
	const [showDatePicker, setShowDatePicker] = useState<Boolean>(false);
	const [showPriorityModal, setShowPriorityModal] = useState<boolean>(false);
	const priorities: Array<"low" | "medium" | "high"> = [
		"low",
		"medium",
		"high",
	];
	const priorityLabels = {
		low: "Low Priority",
		medium: "Medium Priority",
		high: "High Priority",
	};

	const handleDate = (_event: any, selectedDate?: Date): void => {
		setShowDatePicker(false);
		if (selectedDate) {
			setFormData({ ...formData, deadline: selectedDate });
		}
	};

	const getPriorityColor = (priority: "low" | "medium" | "high") => {
		return {
			low: "#4CAF50",
			medium: "#FF9800",
			high: "#f44336",
		}[priority];
	};

	const handleGoalSubmit = async () => {
		if (!user_id) {
			Alert.alert("User not authenticated");
			return;
		}
		if (!formData.title.trim()) {
			Alert.alert("Please enter a goal title");
			return;
		}
		let error;
		if (id) {
			const { error: updateError } = await supabase
				.from("goals")
				.update({
					title: formData.title,
					description: formData.description,
					deadline: formData.deadline.toISOString(),
					priority: formData.priority,
				})
				.eq("id", id);
			error = updateError;
		} else {
			const { error: insertError } = await supabase.from("goals").insert([
				{
					title: formData.title,
					description: formData.description,
					deadline: formData.deadline.toISOString(),
					priority: formData.priority,
					user_id: user_id,
				},
			]);
			error = insertError;
		}

		if (error) {
			console.log("Error handling goal:", error.message);
			return;
		}
		router.push("/(dashboard)/home");
	};

	useEffect(() => {
		const fetchGoal = async (id: number) => {
			const { data, error } = await supabase
				.from("goals")
				.select("*")
				.eq("id", id)
				.single();
			if (error) {
				console.log("Error fetching goal:", error.message);
				return;
			}
			if (data) {
				setFormData({
					title: data.title,
					description: data.description,
					deadline: new Date(data.deadline),
					priority: data.priority,
				});
			}
		};
		if (id) {
			fetchGoal(Number(id));
		}
	}, [id]);

	return (
		<ThemedView style={styles.container}>
			<ThemedView style={styles.formContainer}>
				<ThemedView style={styles.inputContainer}>
					<ThemedText style={styles.label}>Goal Title</ThemedText>
					<ThemedTextInput
						style={styles.input}
						placeholder="Enter your goal"
						value={formData.title}
						onChangeText={(text: string) =>
							setFormData({ ...formData, title: text })
						}
						placeholderTextColor="#999"
					/>
				</ThemedView>

				<ThemedView style={styles.inputContainer}>
					<ThemedText style={styles.label}>Description</ThemedText>
					<ThemedTextInput
						style={[styles.input, styles.textArea]}
						placeholder="Describe your goal"
						value={formData.description}
						onChangeText={(text: string) =>
							setFormData({ ...formData, description: text })
						}
						multiline={true}
						numberOfLines={4}
						placeholderTextColor="#999"
					/>
				</ThemedView>

				<ThemedView style={styles.inputContainer}>
					<ThemedText style={styles.label}>Deadline</ThemedText>
					<ThemedTouchableOpacity
						style={styles.dateButton}
						onPress={() => setShowDatePicker(true)}
					>
						<ThemedText style={styles.dateText}>
							{formatDate(formData.deadline)}
						</ThemedText>
					</ThemedTouchableOpacity>
					{showDatePicker && (
						<DateTimePicker
							value={formData.deadline}
							mode="date"
							display="default"
							minimumDate={new Date()}
							onChange={handleDate}
						/>
					)}
				</ThemedView>

				<ThemedView style={styles.inputContainer}>
					<ThemedText style={styles.label}>Priority</ThemedText>
					<ThemedTouchableOpacity
						style={[
							styles.prioritySelector,
							{
								borderColor: getPriorityColor(
									formData.priority
								),
							},
						]}
						onPress={() => setShowPriorityModal(true)}
					>
						<ThemedView
							style={[
								styles.priorityDot,
								{
									backgroundColor: getPriorityColor(
										formData.priority
									),
								},
							]}
						/>
						<ThemedText style={styles.priorityButtonText}>
							{priorityLabels[formData.priority]}
						</ThemedText>
					</ThemedTouchableOpacity>
				</ThemedView>

				<ThemedTouchableOpacity style={styles.submitButton}>
					<ThemedText
						style={styles.submitButtonText}
						onPress={handleGoalSubmit}
					>
						{id ? "Update Goal" : "Add Goal"}
					</ThemedText>
				</ThemedTouchableOpacity>
				<ThemedTouchableOpacity
					style={styles.cancelButton}
					onPress={() => router.push("/(dashboard)/home")}
				>
					<ThemedText style={styles.cancelText}>Cancel</ThemedText>
				</ThemedTouchableOpacity>

				<Modal
					animationType="slide"
					transparent={true}
					visible={showPriorityModal}
					onRequestClose={() => setShowPriorityModal(false)}
				>
					<ThemedView style={styles.modalContainer}>
						<ThemedView style={styles.modalContent}>
							<ThemedText style={styles.modalTitle}>
								Select Priority
							</ThemedText>
							{priorities.map((priority) => (
								<ThemedTouchableOpacity
									key={priority}
									style={[
										styles.priorityButton,
										{
											backgroundColor:
												getPriorityColor(priority) +
												"20",
										},
										formData.priority === priority && {
											backgroundColor:
												getPriorityColor(priority) +
												"40",
											borderColor:
												getPriorityColor(priority),
											borderWidth: 1,
										},
									]}
									onPress={() => {
										setFormData({
											...formData,
											priority: priority,
										});
										setShowPriorityModal(false);
									}}
								>
									<ThemedView
										style={[
											styles.priorityDot,
											{
												backgroundColor:
													getPriorityColor(priority),
											},
										]}
									/>
									<ThemedText
										style={[
											styles.priorityText,
											{
												color: getPriorityColor(
													priority
												),
											},
										]}
									>
										{priorityLabels[priority]}
									</ThemedText>
								</ThemedTouchableOpacity>
							))}
							<ThemedTouchableOpacity
								style={styles.cancelButton}
								onPress={() => setShowPriorityModal(false)}
							>
								<ThemedText style={styles.cancelText}>
									Cancel
								</ThemedText>
							</ThemedTouchableOpacity>
						</ThemedView>
					</ThemedView>
				</Modal>
			</ThemedView>
		</ThemedView>
	);
};

export default goalForm;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingVertical: 30,
	},
	formContainer: {
		padding: 20,
	},
	inputContainer: {
		marginBottom: 20,
	},
	label: {
		fontSize: 16,
		fontWeight: "600",
		marginBottom: 8,
	},
	input: {
		borderWidth: 1,
		borderRadius: 8,
		padding: 12,
		fontSize: 16,
	},
	textArea: {
		height: 100,
		textAlignVertical: "top",
	},
	dateButton: {
		borderWidth: 1,
		borderRadius: 8,
		padding: 12,
		flexDirection: "row",
		alignItems: "center",
	},
	dateText: {
		fontSize: 16,
	},
	prioritySelector: {
		borderWidth: 1,
		borderRadius: 8,
		padding: 12,
		flexDirection: "row",
		alignItems: "center",
	},
	priorityDot: {
		width: 12,
		height: 12,
		borderRadius: 6,
		marginRight: 8,
	},
	priorityButtonText: {
		fontSize: 16,
	},
	submitButton: {
		borderRadius: 8,
		padding: 16,
		alignItems: "center",
		marginTop: 30,
	},
	submitButtonText: {
		fontSize: 18,
		fontWeight: "bold",
	},
	modalContainer: {
		flex: 1,
		justifyContent: "flex-end",
		backgroundColor: "rgba(0, 0, 0, 0.5)",
	},
	modalContent: {
		padding: 20,
		borderTopLeftRadius: 20,
		borderTopRightRadius: 20,
	},
	modalTitle: {
		fontSize: 20,
		fontWeight: "bold",
		marginBottom: 15,
		textAlign: "center",
	},
	priorityButton: {
		flexDirection: "row",
		alignItems: "center",
		padding: 15,
		borderRadius: 8,
		marginVertical: 5,
		borderWidth: 1,
		borderColor: "transparent",
	},
	priorityText: {
		fontSize: 16,
		marginLeft: 8,
	},
	cancelButton: {
		marginTop: 15,
		padding: 15,
		borderRadius: 8,
		borderWidth: 1,
	},
	cancelText: {
		fontSize: 16,
		textAlign: "center",
		fontWeight: "600",
	},
});
