import React, { useCallback, useEffect } from "react";
import {
  View,
  TouchableWithoutFeedback,
  Platform,
  UIManager,
  LayoutChangeEvent,
  Modal,
} from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
  runOnJS,
} from "react-native-reanimated";
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from "react-native-gesture-handler";

// Enable LayoutAnimation for Android
if (Platform.OS === "android") {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

interface BottomDrawerProps {
  isVisible: boolean;
  onDismiss: () => void;
  children: React.ReactNode;
}

export const BottomDrawer: React.FC<BottomDrawerProps> = ({
  isVisible,
  onDismiss,
  children,
}) => {
  const translateY = useSharedValue(0);
  const contentHeight = useSharedValue(0);
  const backdropOpacity = useSharedValue(0);

  useEffect(() => {
    if (isVisible) {
      translateY.value = withSpring(0, { damping: 20 });
      backdropOpacity.value = withTiming(0.25, { duration: 300 });
    } else {
      translateY.value = withSpring(contentHeight.value);
      backdropOpacity.value = withTiming(0, { duration: 300 });
    }
  }, [isVisible]);

  const gesture = Gesture.Pan()
    .onChange((event) => {
      const newPosition = Math.max(0, translateY.value + event.changeY);
      translateY.value = newPosition;
    })
    .onEnd((event) => {
      const DRAG_THRESHOLD = contentHeight.value * 0.2;
      if (event.velocityY > 500 || translateY.value > DRAG_THRESHOLD) {
        runOnJS(onDismiss)();
      } else {
        translateY.value = withSpring(0, { damping: 20 });
      }
    });

  const handleLayout = (event: LayoutChangeEvent) => {
    const height = event.nativeEvent.layout.height;
    contentHeight.value = height;
    if (!isVisible) {
      translateY.value = height;
    }
  };

  const animatedStyles = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  const backdropStyles = useAnimatedStyle(() => ({
    opacity: backdropOpacity.value,
  }));

  const dismiss = useCallback(() => {
    backdropOpacity.value = withTiming(0, { duration: 300 });
    translateY.value = withTiming(
      contentHeight.get(),
      { duration: 300 },
      (finished) => {
        if (finished) {
          runOnJS(onDismiss)();
        }
      },
    );
  }, []);

  return (
    <Modal
      visible={isVisible}
      transparent
      statusBarTranslucent
      onRequestClose={onDismiss}
      animationType="none"
    >
      <View className="flex-1 justify-end">
        {/* Backdrop */}
        <TouchableWithoutFeedback onPress={dismiss}>
          <Animated.View
            className="absolute inset-0 bg-black"
            style={backdropStyles}
          />
        </TouchableWithoutFeedback>

        {/* Drawer */}
        <GestureDetector gesture={gesture}>
          <Animated.View
            className="bg-white rounded-t-3xl px-4 pt-4 pb-safe mx-2"
            style={animatedStyles}
            onLayout={handleLayout}
          >
            {/* Drag Handle */}
            <View className="self-center w-1/4 h-2 bg-neutral-300 rounded-full mb-8" />

            {/* Content */}
            <View className="flex-shrink pb-16">{children}</View>
          </Animated.View>
        </GestureDetector>
      </View>
    </Modal>
  );
};
