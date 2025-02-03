import React, { useState, useEffect } from "react";
import fetchPlanDetails from "../api/plans/fetchPlanDetails";
import { useNavigation } from "@react-navigation/native";
import {
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from "react-native";

export default function CreatePlanScreen({ route }) {
  const { planId = null } = route.params || {};

  //Function creates and initial plan object to be sent to the server in AddInviteesScreen
  const createPlanObject = (
    title,
    description,
    location,
    startTime,
    endTime
  ) => {
    return {
      title,
      description,
      location,
      startTime,
      endTime,
      invitees: [], //to be populated in AddInviteesScreen
    };
  };

  console.log("Create Plans Screen Plan ID ", planId);

  // Initialize with the current date and time in ISO 8601 format for testing
  const [title, setTitle] = useState();
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [startTime, setStartTime] = useState(new Date().toISOString()); // Default to current time
  const [endTime, setEndTime] = useState(
    new Date(new Date().getTime() + 60 * 60 * 1000).toISOString() // Default to 1 hour later
  );

  useEffect(() => {
    if (!planId) return;

    const fetchPlan = async () => {
      try {
        const response = await fetchPlanDetails(planId);
        const plan = response.data;

        setTitle(plan.title);
        setDescription(plan.description);
        setLocation(plan.location);
        setStartTime(plan.startTime);
        setEndTime(plan.endTime);
      } catch (error) {
        console.error("Failed to fetch plan details:", error);
      }
    };

    fetchPlan();
  }, [planId]);

  const navigation = useNavigation();

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior="padding"
      keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0}
    >
      <ScrollView contentContainerStyle={styles.form}>
        <Text style={styles.title}>Create Plan</Text>
        <Text style={styles.label}>Title</Text>
        <TextInput
          style={styles.input}
          value={title}
          onChangeText={setTitle}
          placeholder="Enter title"
        />
        <Text style={styles.label}>Description</Text>
        <TextInput
          style={styles.input}
          value={description}
          onChangeText={setDescription}
          placeholder="Enter description"
          multiline
        />
        <Text style={styles.label}>Location</Text>
        <TextInput
          style={styles.input}
          value={location}
          onChangeText={setLocation}
          placeholder="Enter location"
        />
        <Text style={styles.label}>Start Time</Text>
        <TextInput
          style={styles.input}
          value={startTime}
          onChangeText={setStartTime}
          placeholder="Enter start time (e.g., 2024-12-22T15:00)"
        />
        <Text style={styles.label}>End Time</Text>
        <TextInput
          style={styles.input}
          value={endTime}
          onChangeText={setEndTime}
          placeholder="Enter end time (e.g., 2024-12-22T17:00)"
        />
        {planId ? (
          // Show DELETE button if planId exists
          <TouchableOpacity
            style={styles.deleteButton}
            onPress={() => console.log("Delete plan")}
          >
            <Text style={styles.buttonText}>Delete</Text>
          </TouchableOpacity>
        ) : (
          // Show ADD INVITEES button if planId is missing (i.e. from EditPlansScreen)
          <TouchableOpacity
            style={styles.submitButton}
            onPress={() => {
              const planObject = {
                title,
                description,
                location,
                startTime,
                endTime,
              };
              navigation.navigate("AddInvitees", { planObject });
            }}
          >
            <Text style={styles.buttonText}>Add Invitees</Text>
          </TouchableOpacity>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  form: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    fontWeight: "bold",
  },
  deleteButton: {
    backgroundColor: "red",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
  submitButton: {
    backgroundColor: "#007BFF",
    paddingVertical: 12,
    alignItems: "center",
    borderRadius: 8,
  },
  submitButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
