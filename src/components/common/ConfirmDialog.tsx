import React from 'react';
import {
  View,
  Modal,
  StyleSheet,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AppText } from './AppText';
import { AppButton } from './AppButton';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';
import { shadows } from '../../theme/shadows';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';

interface ConfirmDialogProps {
  visible: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  variant?: 'danger' | 'primary';
  onConfirm: () => void;
  onCancel: () => void;
}

export const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  visible,
  title,
  message,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  variant = 'danger',
  onConfirm,
  onCancel,
}) => {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="none"
      onRequestClose={onCancel}
      statusBarTranslucent
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <TouchableWithoutFeedback onPress={onCancel}>
          <Animated.View
            entering={FadeIn.duration(200)}
            exiting={FadeOut.duration(200)}
            style={styles.overlay}
          >
            <TouchableWithoutFeedback>
              <SafeAreaView edges={['bottom']} style={styles.safeArea}>
                <Animated.View
                  entering={FadeIn.duration(200)}
                  exiting={FadeOut.duration(200)}
                  style={[styles.dialog, shadows.xlarge]}
                >
                  <View style={styles.content}>
                    <AppText variant="h2" style={styles.title}>
                      {title}
                    </AppText>
                    <AppText variant="body" style={styles.message}>
                      {message}
                    </AppText>
                  </View>

                  <View style={styles.actions}>
                    <AppButton
                      title={cancelLabel}
                      onPress={onCancel}
                      variant="outline"
                      style={styles.button}
                    />
                    <AppButton
                      title={confirmLabel}
                      onPress={onConfirm}
                      variant={variant}
                      style={styles.button}
                    />
                  </View>
                </Animated.View>
              </SafeAreaView>
            </TouchableWithoutFeedback>
          </Animated.View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  keyboardView: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.lg,
  },
  safeArea: {
    width: '100%',
    maxWidth: 400,
  },
  dialog: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    width: '100%',
    overflow: 'hidden',
  },
  content: {
    padding: spacing.xl,
  },
  title: {
    color: colors.textPrimary,
    marginBottom: spacing.md,
  },
  message: {
    color: colors.textSecondary,
  },
  actions: {
    flexDirection: 'row',
    padding: spacing.md,
    paddingTop: 0,
    gap: spacing.md,
  },
  button: {
    flex: 1,
  },
});

