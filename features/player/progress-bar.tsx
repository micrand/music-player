import { Slider } from '@/components/gestures/slider';
import { StyleSheet, View } from '@/components/react-native';
import { useTheme } from '@/hooks/useThemeColor';
import { FC } from 'react';
import { StyleProp, ViewStyle } from 'react-native';

type ProgressBarProps = {
  elapsedTime: number;
  totalTime: number;
  style?: StyleProp<ViewStyle>;
  onChange?: (newTime: number) => void;
  onStart?: () => void;
  onStop?: () => void;
};

export const ProgressBar: FC<ProgressBarProps> = ({
  elapsedTime,
  totalTime,
  style,
  onChange,
  onStart,
  onStop,
}) => {
  const theme = useTheme();
  const widthPercentage = elapsedTime / totalTime;

  const onChangeHandler = (percentage: number) => {
    onChange?.(percentage * totalTime);
  };
  return (
    <View style={style}>
      <Slider
        width={widthPercentage}
        containerStyle={{ ...styles.container, backgroundColor: theme.tabIconDefault }}
        sliderStyle={{ backgroundColor: theme.tint }}
        onChange={onChangeHandler}
        onStart={onStart}
        onStop={onStop}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 8,
    backgroundColor: 'red',
    borderRadius: 8,
    overflow: 'hidden',
  },
  bar: {
    height: '100%',
    backgroundColor: 'green',
  },
});
