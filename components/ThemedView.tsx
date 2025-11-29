import { Ref } from 'react';
import { View, type ViewProps } from 'react-native';

import { useThemeColor } from '@/hooks/useThemeColor';

export type ThemedViewProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
  reference?: Ref<View>;
};

export function ThemedView({
  style,
  lightColor,
  darkColor,
  reference,
  children,
  ...otherProps
}: ThemedViewProps) {
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'background');

  return (
    <View style={[{ backgroundColor }, style]} ref={reference} {...otherProps}>
      {children}
    </View>
  );
}
