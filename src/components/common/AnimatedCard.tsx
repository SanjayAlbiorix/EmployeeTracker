import React from 'react';
import { StyleSheet, Pressable, ViewStyle, StyleProp } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { shadows } from '../../theme/shadows';
import { isWeb } from '../../utils/platform';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

interface AnimatedCardProps {
  children: React.ReactNode;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
  disabled?: boolean;
}

export const AnimatedCard: React.FC<AnimatedCardProps> = ({
  children,
  onPress,
  style,
  disabled
}) => {
  const scale = useSharedValue(1);
  const shadowOpacity = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const shadowStyle = useAnimatedStyle(() => ({
    shadowOpacity: isWeb ? undefined : shadowOpacity.value * 0.1,
  }));

  const handlePressIn = () => {
    if (disabled) return;
    scale.value = withSpring(0.98, { damping: 10, stiffness: 300 });
    shadowOpacity.value = withTiming(1, { duration: 150 });
  };

  const handlePressOut = () => {
    if (disabled) return;
    scale.value = withSpring(1, { damping: 10, stiffness: 300 });
    shadowOpacity.value = withTiming(0, { duration: 150 });
  };

  const handleHoverIn = () => {
    if (disabled || !isWeb) return;
    scale.value = withTiming(1.02, { duration: 200 });
  };

  const handleHoverOut = () => {
    if (disabled || !isWeb) return;
    scale.value = withTiming(1, { duration: 200 });
  };

  return (
    <AnimatedPressable
      style={[styles.card, shadows.card, style, animatedStyle, shadowStyle]}
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onHoverIn={handleHoverIn}
      onHoverOut={handleHoverOut}
      disabled={disabled}
    >
      {children}
    </AnimatedPressable>
  );
};

const styles = StyleSheet.create({
  card: {
    ...(isWeb && {
      transition: 'box-shadow 0.2s ease',
      cursor: 'pointer',
    } as any),
  },
});
