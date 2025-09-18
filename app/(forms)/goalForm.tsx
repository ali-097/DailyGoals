import DateTimePicker from "@react-native-community/datetimepicker";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
	Modal,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from "react-native";
import { supabase } from "../lib/supabase";
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
		const user = await supabase.auth.getUser();
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
					user_id: user.data.user?.id,
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
		<View style={styles.container}>
			<View style={styles.formContainer}>
				<View style={styles.inputContainer}>
					<Text style={styles.label}>Goal Title</Text>
					<TextInput
						style={styles.input}
						placeholder="Enter your goal"
						value={formData.title}
						onChangeText={(text) =>
							setFormData({ ...formData, title: text })
						}
						placeholderTextColor="#999"
					/>
				</View>

				<View style={styles.inputContainer}>
					<Text style={styles.label}>Description</Text>
					<TextInput
						style={[styles.input, styles.textArea]}
						placeholder="Describe your goal"
						value={formData.description}
						onChangeText={(text) =>
							setFormData({ ...formData, description: text })
						}
						multiline={true}
						numberOfLines={4}
						placeholderTextColor="#999"
					/>
				</View>

				<View style={styles.inputContainer}>
					<Text style={styles.label}>Deadline</Text>
					<TouchableOpacity
						style={styles.dateButton}
						onPress={() => setShowDatePicker(true)}
					>
						<Text style={styles.dateText}>
							{formatDate(formData.deadline)}
						</Text>
					</TouchableOpacity>
					{showDatePicker && (
						<DateTimePicker
							value={formData.deadline}
							mode="date"
							display="default"
							minimumDate={new Date()}
							onChange={handleDate}
						/>
					)}
				</View>

				<View style={styles.inputContainer}>
					<Text style={styles.label}>Priority</Text>
					<TouchableOpacity
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
						<View
							style={[
								styles.priorityDot,
								{
									backgroundColor: getPriorityColor(
										formData.priority
									),
								},
							]}
						/>
						<Text style={styles.priorityButtonText}>
							{priorityLabels[formData.priority]}
						</Text>
					</TouchableOpacity>
				</View>

				<TouchableOpacity style={styles.submitButton}>
					<Text
						style={styles.submitButtonText}
						onPress={handleGoalSubmit}
					>
						{id ? "Update Goal" : "Add Goal"}
					</Text>
				</TouchableOpacity>
				<TouchableOpacity
					style={styles.cancelButton}
					onPress={() => router.push("/(dashboard)/home")}
				>
					<Text style={styles.cancelText}>Cancel</Text>
				</TouchableOpacity>

				<Modal
					animationType="slide"
					transparent={true}
					visible={showPriorityModal}
					onRequestClose={() => setShowPriorityModal(false)}
				>
					<View style={styles.modalContainer}>
						<View style={styles.modalContent}>
							<Text style={styles.modalTitle}>
								Select Priority
							</Text>
							{priorities.map((priority) => (
								<TouchableOpacity
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
									<View
										style={[
											styles.priorityDot,
											{
												backgroundColor:
													getPriorityColor(priority),
											},
										]}
									/>
									<Text
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
									</Text>
								</TouchableOpacity>
							))}
							<TouchableOpacity
								style={styles.cancelButton}
								onPress={() => setShowPriorityModal(false)}
							>
								<Text style={styles.cancelText}>Cancel</Text>
							</TouchableOpacity>
						</View>
					</View>
				</Modal>
			</View>
		</View>
	);
};

export default goalForm;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingVertical: 30,
		backgroundColor: "#f5f5f5",
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
		color: "#333",
	},
	input: {
		backgroundColor: "#fff",
		borderWidth: 1,
		borderColor: "#ddd",
		borderRadius: 8,
		padding: 12,
		fontSize: 16,
		color: "#333",
	},
	textArea: {
		height: 100,
		textAlignVertical: "top",
	},
	dateButton: {
		backgroundColor: "#fff",
		borderWidth: 1,
		borderColor: "#ddd",
		borderRadius: 8,
		padding: 12,
		flexDirection: "row",
		alignItems: "center",
	},
	dateText: {
		fontSize: 16,
		color: "#333",
	},
	prioritySelector: {
		backgroundColor: "#fff",
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
		color: "#333",
	},
	submitButton: {
		backgroundColor: "#0a7ea4",
		borderRadius: 8,
		padding: 16,
		alignItems: "center",
		marginTop: 30,
	},
	submitButtonText: {
		color: "#fff",
		fontSize: 18,
		fontWeight: "bold",
	},
	modalContainer: {
		flex: 1,
		justifyContent: "flex-end",
		backgroundColor: "rgba(0, 0, 0, 0.5)",
	},
	modalContent: {
		backgroundColor: "#fff",
		padding: 20,
		borderTopLeftRadius: 20,
		borderTopRightRadius: 20,
	},
	modalTitle: {
		fontSize: 20,
		fontWeight: "bold",
		marginBottom: 15,
		textAlign: "center",
		color: "#333",
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
		backgroundColor: "#f8f8f8",
		borderWidth: 1,
		borderColor: "#ddd",
	},
	cancelText: {
		fontSize: 16,
		textAlign: "center",
		color: "#666",
		fontWeight: "600",
	},
});
