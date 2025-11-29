import { StyleSheet, Text, View } from '@/components/react-native';
import { FC, useRef, useState } from 'react';
import { View as ViewNative, ViewProps } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';

type Props = {
  isDebug?: boolean;
  width: number; // Between [0..1]
  onChange?: (ratio: number) => void; // Between [0..1]
  onStart?: () => void;
  onStop?: () => void;

  containerStyle?: ViewProps['style'];
  sliderStyle?: ViewProps['style'];
};

const getWidth = (element: ViewNative) =>
  new Promise<number>((resolve) => {
    element.measure((_1, _2, width) => {
      resolve(width);
    });
  });

const clamp = (value: number, low: number = 0, high: number = 1) =>
  Math.min(Math.max(value, low), high);

export const Slider: FC<Props> = ({
  width: _width,
  isDebug,
  onChange: onChangeHandler,
  onStart,
  onStop,
  containerStyle,
  sliderStyle,
}) => {
  const containerRef = useRef<ViewNative>(null);
  const sliderRef = useRef<ViewNative>(null);

  const [width, setWidth] = useState(_width);
  const [gesture, setGesture] = useState(false);

  const gestureHandler = Gesture.Pan()
    .onBegin(() => {
      onStart?.();
      setGesture(true);
    })
    .onTouchesDown((state) => setWidth(state.changedTouches[0].x))
    .onChange((state) => setWidth(state.x))
    .onTouchesUp(async () => {
      const container = containerRef.current;
      const slider = sliderRef.current;
      if (container && slider && onChangeHandler) {
        const result = await Promise.all([getWidth(slider), getWidth(container)]);

        onChangeHandler(clamp(result[0] / result[1]));
      }
      onStop?.();
      setTimeout(() => setGesture(false), 500);
    });
  return (
    <View>
      {isDebug && <Text>Slider Width: {_width}</Text>}
      <GestureDetector gesture={gestureHandler}>
        <View 
          style={[styles.sliderWrapper, containerStyle]} 
          reference={containerRef}>
          <View
            style={[
              styles.slider, 
              sliderStyle, 
              // If a gesture is active, use the pixel width from the gesture
              // Otherwise, use the percentage width from the props
              { width: gesture ? width : `${_width * 100}%` }
            ]}
              reference={sliderRef}
          />
        </View>
      </GestureDetector>
    </View>
  );
};

const styles = StyleSheet.create({
  sliderWrapper: {
    height: 15,
    width: '100%',
    backgroundColor: 'gray',
    overflow: 'hidden',
  },
  slider: {
    height: '100%',
    backgroundColor: 'white',
  },
});
