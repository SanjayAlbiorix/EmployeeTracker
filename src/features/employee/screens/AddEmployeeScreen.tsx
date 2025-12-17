import React, { memo, useState } from "react";
import { View, StyleSheet, ScrollView, TouchableOpacity, KeyboardAvoidingView, Platform } from "react-native";
import { theme } from "@/ui/theme";
import Text from "@/ui/components/Text";
import Input from "@/ui/components/Input";
import Button from "@/ui/components/Button";
import TopBar from "@/ui/layout/TopBar";
import ScreenContainer from "@/ui/layout/ScreenContainer";
import { EmployeeScreenProps } from "@/types/navigation";

type Props = EmployeeScreenProps<"AddEmployee">;

const AddEmployeeScreen: React.FC<Props> = ({ navigation }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    department: "",
    designation: "",
    employmentType: "Full-Time",
    status: "Active",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (key: string, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = () => {
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      console.log("Form Data:", formData);
      setIsSubmitting(false);
      navigation.navigate("EmployeeList", { newEmployee: true });
    }, 1000);
  };

  return (
    <ScreenContainer scroll>
      <TopBar title="Add Employee" showBack />
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : undefined} style={{ flex: 1 }}>
        <View style={styles.container}>
          
          {/* Basic Information Section */}
          <View style={styles.section}>
            <Text variant="lg" weight="bold" style={styles.sectionTitle}>Basic Information</Text>
            <View style={styles.card}>
              <Input
                label="Full Name"
                placeholder="e.g. John Doe"
                value={formData.fullName}
                onChangeText={(text) => handleChange("fullName", text)}
              />
              <Input
                label="Email"
                placeholder="e.g. john@company.com"
                value={formData.email}
                onChangeText={(text) => handleChange("email", text)}
                keyboardType="email-address"
              />
              <Input
                label="Phone"
                placeholder="e.g. +1 234 567 8900"
                value={formData.phone}
                onChangeText={(text) => handleChange("phone", text)}
                keyboardType="phone-pad"
              />
            </View>
          </View>

          {/* Job Information Section */}
          <View style={styles.section}>
            <Text variant="lg" weight="bold" style={styles.sectionTitle}>Job Information</Text>
            <View style={styles.card}>
              <View style={styles.row}>
                <View style={styles.halfInput}>
                  <Input
                    label="Department"
                    placeholder="Select Department"
                    value={formData.department}
                    onChangeText={(text) => handleChange("department", text)}
                  />
                </View>
                <View style={styles.halfInput}>
                  <Input
                    label="Designation"
                    placeholder="e.g. Senior Developer"
                    value={formData.designation}
                    onChangeText={(text) => handleChange("designation", text)}
                  />
                </View>
              </View>

              <View style={styles.fieldContainer}>
                <Text variant="sm" weight="medium" style={styles.label}>
                  Employment Type
                </Text>
                <View style={styles.segmentedControl}>
                  {["Full-Time", "Part-Time", "Contract"].map((type) => (
                    <TouchableOpacity
                      key={type}
                      style={[
                        styles.segment,
                        formData.employmentType === type && styles.activeSegment,
                      ]}
                      onPress={() => handleChange("employmentType", type)}
                    >
                      <Text
                        variant="sm"
                        color={
                          formData.employmentType === type
                            ? theme.colors.surface
                            : theme.colors.textSecondary
                        }
                        weight={formData.employmentType === type ? "bold" : "regular"}
                      >
                        {type}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            </View>
          </View>

          {/* Status Section */}
          <View style={styles.section}>
            <Text variant="lg" weight="bold" style={styles.sectionTitle}>Status</Text>
            <View style={styles.card}>
               <View style={styles.row}>
                {["Active", "Inactive"].map((status) => (
                  <TouchableOpacity
                    key={status}
                    style={styles.radioOption}
                    onPress={() => handleChange("status", status)}
                  >
                    <View style={[styles.radioCircle, formData.status === status && styles.radioSelected]} />
                    <Text variant="md">{status}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </View>

          <View style={styles.actions}>
            <Button
              title="Cancel"
              variant="outline"
              onPress={() => navigation.goBack()}
              style={{ flex: 1 }}
              disabled={isSubmitting}
            />
            <Button
              title={isSubmitting ? "Adding..." : "Add Employee"}
              variant="primary"
              onPress={handleSubmit}
              style={{ flex: 1 }}
              disabled={isSubmitting}
            />
          </View>

        </View>
      </KeyboardAvoidingView>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: theme.spacing.md,
    gap: theme.spacing.lg,
    maxWidth: 600,
    width: "100%",
    alignSelf: "center",
  },
  section: {
    gap: theme.spacing.sm,
  },
  sectionTitle: {
    marginLeft: theme.spacing.xs,
    color: theme.colors.textSecondary,
  },
  card: {
    backgroundColor: theme.colors.surface,
    padding: theme.spacing.lg,
    borderRadius: theme.spacing.sm,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
    gap: theme.spacing.md,
  },
  row: {
    flexDirection: "row",
    gap: theme.spacing.md,
  },
  halfInput: {
    flex: 1,
  },
  fieldContainer: {
    gap: theme.spacing.xs,
  },
  label: {
    color: theme.colors.textPrimary,
    marginBottom: 4,
  },
  segmentedControl: {
    flexDirection: "row",
    backgroundColor: theme.colors.background,
    borderRadius: theme.spacing.xs,
    padding: 4,
  },
  segment: {
    flex: 1,
    paddingVertical: 8,
    alignItems: "center",
    borderRadius: theme.spacing.xs - 2,
  },
  activeSegment: {
    backgroundColor: theme.colors.primary,
  },
  radioOption: {
    flexDirection: "row",
    alignItems: "center",
    gap: theme.spacing.sm,
    marginRight: theme.spacing.lg,
  },
  radioCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: theme.colors.primary,
    backgroundColor: "transparent",
  },
  radioSelected: {
    backgroundColor: theme.colors.primary,
    borderWidth: 5,
    borderColor: theme.colors.primary,
  },
  actions: {
    flexDirection: "row",
    gap: theme.spacing.md,
    marginTop: theme.spacing.xs,
    marginBottom: theme.spacing.xl,
  },
});

export default memo(AddEmployeeScreen);
