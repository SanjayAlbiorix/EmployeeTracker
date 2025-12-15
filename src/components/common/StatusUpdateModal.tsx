import React, { useState } from 'react';
import {
  View,
  Modal,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { FadeIn, FadeOut, SlideInDown, SlideOutDown } from 'react-native-reanimated';
import { AppText } from './AppText';
import { AppButton } from './AppButton';
import { StatusBadge } from './StatusBadge';
import { LeaveRequest } from '../../types/models';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';
import { shadows } from '../../theme/shadows';
import { isWeb } from '../../utils/platform';

interface StatusUpdateModalProps {
  visible: boolean;
  leaveRequest: LeaveRequest | null;
  onClose: () => void;
  onConfirm: (status: LeaveRequest['status']) => void;
}

type StatusOption = LeaveRequest['status'];

const statusOptions: { value: StatusOption; label: string }[] = [
  { value: 'approved', label: 'Approved' },
  { value: 'pending', label: 'Pending' },
  { value: 'rejected', label: 'Rejected' },
];

const AnimatedModal = Animated.createAnimatedComponent(Modal);

export const StatusUpdateModal: React.FC<StatusUpdateModalProps> = ({
  visible,
  leaveRequest,
  onClose,
  onConfirm,
}) => {
  const [selectedStatus, setSelectedStatus] = useState<StatusOption | null>(
    leaveRequest?.status || null
  );

  React.useEffect(() => {
    if (leaveRequest) {
      setSelectedStatus(leaveRequest.status);
    }
  }, [leaveRequest]);

  const handleConfirm = () => {
    if (selectedStatus) {
      onConfirm(selectedStatus);
    }
  };

  if (!leaveRequest) return null;

  const ModalContent = (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.keyboardView}
    >
      <SafeAreaView edges={['bottom']} style={styles.safeArea}>
        <Animated.View
          entering={isWeb ? FadeIn.duration(200) : SlideInDown.duration(300)}
          exiting={isWeb ? FadeOut.duration(200) : SlideOutDown.duration(300)}
          style={[styles.modalContent, isWeb ? styles.modalContentWeb : styles.modalContentMobile]}
        >
          <View style={styles.header}>
            <AppText variant="h2" style={styles.title}>
              Update Leave Status
            </AppText>
            {!isWeb && (
              <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                <AppText variant="body" style={styles.closeIcon}>
                  ✕
                </AppText>
              </TouchableOpacity>
            )}
          </View>

          <View style={styles.leaveInfo}>
            <AppText variant="body" style={styles.employeeName}>
              {leaveRequest.employeeName}
            </AppText>
            <AppText variant="caption" style={styles.leaveDates}>
              {new Date(leaveRequest.startDate).toLocaleDateString()} -{' '}
              {new Date(leaveRequest.endDate).toLocaleDateString()}
            </AppText>
          </View>

          <ScrollView style={styles.optionsContainer} showsVerticalScrollIndicator={false}>
            {statusOptions.map((option) => (
              <TouchableOpacity
                key={option.value}
                style={[
                  styles.option,
                  selectedStatus === option.value && styles.optionSelected,
                ]}
                onPress={() => setSelectedStatus(option.value)}
                activeOpacity={0.7}
              >
                <View style={styles.optionContent}>
                  <StatusBadge status={option.value} />
                  <AppText variant="body" style={styles.optionLabel}>
                    {option.label}
                  </AppText>
                </View>
                <View style={[
                  styles.radioIndicator,
                  selectedStatus === option.value && styles.radioIndicatorSelected
                ]}>
                  {selectedStatus === option.value && <View style={styles.radioInner} />}
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>

          <View style={styles.actions}>
            <AppButton
              title="Cancel"
              onPress={onClose}
              variant="outline"
              style={styles.button}
            />
            <AppButton
              title="Update Status"
              onPress={handleConfirm}
              variant="primary"
              style={styles.button}
              disabled={!selectedStatus || selectedStatus === leaveRequest.status}
            />
          </View>
        </Animated.View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );

  return (
    <Modal
      visible={visible}
      transparent
      animationType="none"
      onRequestClose={onClose}
      statusBarTranslucent
    >
      <TouchableWithoutFeedback onPress={isWeb ? undefined : onClose}>
        <Animated.View
          entering={FadeIn.duration(200)}
          exiting={FadeOut.duration(200)}
          style={styles.overlay}
        >
          <TouchableWithoutFeedback>
            <View style={styles.overlayContent}>
              {ModalContent}
            </View>
          </TouchableWithoutFeedback>
        </Animated.View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
    ...(isWeb && {
      justifyContent: 'center',
      alignItems: 'center',
    }),
  },
  overlayContent: {
    width: '100%',
    maxHeight: '90%',
    ...(isWeb && {
      maxWidth: 500,
      width: '90%',
    }),
  },
  keyboardView: {
    flex: 1,
    justifyContent: 'flex-end',
    ...(isWeb && {
      justifyContent: 'center',
    }),
  },
  safeArea: {
    flex: 0,
  },
  modalContent: {
    backgroundColor: colors.surface,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    ...shadows.xlarge,
  },
  modalContentWeb: {
    borderRadius: 16,
    maxHeight: '80vh' as any,
    width: 600, // Fixed width for web
    alignSelf: 'center',
  },
  modalContentMobile: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: colors.divider,
  },
  title: {
    color: colors.textPrimary,
    flex: 1,
  },
  closeButton: {
    padding: spacing.xs,
    minWidth: 44,
    minHeight: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeIcon: {
    fontSize: 24,
    color: colors.textSecondary,
  },
  leaveInfo: {
    padding: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: colors.divider,
  },
  employeeName: {
    color: colors.textPrimary,
    fontWeight: '600',
    marginBottom: spacing.xs,
  },
  leaveDates: {
    color: colors.textSecondary,
  },
  optionsContainer: {
    maxHeight: 300,
    padding: spacing.md,
  },
  option: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: spacing.md,
    borderRadius: 12,
    marginBottom: spacing.sm,
    borderWidth: 2,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    minHeight: 56,
  },
  optionSelected: {
    borderColor: colors.primary,
    backgroundColor: colors.primarySoft,
  },
  optionContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    flex: 1,
  },
  optionLabel: {
    color: colors.textPrimary,
    fontWeight: '500',
  },
  radioIndicator: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioIndicatorSelected: {
    borderColor: colors.primary,
    backgroundColor: colors.primarySoft,
  },
  radioInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: colors.primary,
  },
  actions: {
    flexDirection: 'row',
    padding: spacing.lg,
    paddingTop: spacing.md,
    gap: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.divider,
  },
  button: {
    flex: 1,
  },
});
