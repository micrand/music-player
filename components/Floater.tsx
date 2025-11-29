import { ElementStyleProp, StyleSheet, View } from '@/components/react-native';
import { FC, PropsWithChildren } from 'react';

type Props = {
  position?: 'bottom' | '';
  style?: ElementStyleProp;
};
export const Floater: FC<PropsWithChildren<Props>> = ({ children, position = '', style }) => {
  return <View style={[styles[position], style]}>{children}</View>;
};

const styles = StyleSheet.create({
  bottom: {
    position: 'absolute',
    width: '100%',
    elevation: 5,
  },
  ['']: {},
});
