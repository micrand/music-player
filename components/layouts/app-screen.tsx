/**
 * Platform-adaptive screen wrapper component
 * 
 * Renders different container components based on the platform:
 * - iOS/Android: View with overflow scroll for native performance
 * - Web: ScrollView with automatic content inset adjustment
 */

import { Platform, ScrollView, View } from '@/components/react-native';
import { PropsWithChildren } from 'react';

import { styles } from '@/styles/common';

export const AppScreen = ({ children }: PropsWithChildren) => {
  return Platform.select({
    android: <View style={[styles.screen, { overflow: 'scroll' }]}>{children}</View>,
    ios: <View style={[styles.screen, { overflow: 'scroll' }]}>{children}</View>,
    default: (
      <ScrollView contentInsetAdjustmentBehavior="automatic" style={styles.screen}>
        {children}
      </ScrollView>
    ),
  });
};
