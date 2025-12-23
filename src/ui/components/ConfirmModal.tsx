import React from "react";
import { Modal, View, StyleSheet, TouchableWithoutFeedback } from "react-native";
import { theme } from "../theme";
import Card from "./Card";
import Text from "./Text";
import Button from "./Button";

type ConfirmModalProps = {
  visible: boolean;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
};

const ConfirmModal: React.FC<ConfirmModalProps> = ({
  visible,
  title,
  message,
  confirmText = "Confirm",
  cancelText = "Cancel",
  onConfirm,
  onCancel,
}) => {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onCancel}
    >
      <TouchableWithoutFeedback onPress={onCancel}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback>
            <View>
              <Card style={styles.card}>
                <Text variant="lg" weight="bold" style={styles.title}>
                  {title}
                </Text>
                <Text variant="md" color={theme.colors.textSecondary} style={styles.message}>
                  {message}
                </Text>

                <View style={styles.buttonContainer}>
                  <Button
                    title={cancelText}
                    onPress={onCancel}
                    variant="outline"
                    style={styles.button}
                  />
                  <View style={styles.spacer} />
                  <Button
                    title={confirmText}
                    onPress={onConfirm}
                    variant="primary"
                    style={[styles.button, styles.destructiveButton]}
                  />
                </View>
              </Card>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
    padding: theme.spacing.lg,
  },
  card: {
    width: "100%",
    maxWidth: 400,
    alignItems: "center",
    padding: theme.spacing.xl,
  },
  title: {
    marginBottom: theme.spacing.sm,
  },
  message: {
    textAlign: "center",
    marginBottom: theme.spacing.xl,
  },
  buttonContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
  },
  button: {
    flex: 1,
  },
  spacer: {
    width: theme.spacing.md,
  },
  destructiveButton: {
    backgroundColor: theme.colors.error,
  },
});

export default ConfirmModal;
