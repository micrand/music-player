import { NativeStackNavigationOptions } from '@react-navigation/native-stack';

import { Stack } from 'expo-router';
import { FC, PropsWithChildren } from 'react';

import { FontSize } from '@/constants/tokens';
import { useTheme } from '@/hooks/useThemeColor';

type Props = {
  title: string;
  stackWrapped?: boolean;
};

export const StackScreenHeader: FC<PropsWithChildren<Props>> = ({ title, stackWrapped = true }) => {
  const colors = useTheme();
  const headerStylesOptions: NativeStackNavigationOptions = {
    headerStyle: {
      backgroundColor: colors.background,
    },
    headerTitleStyle: {
      color: colors.text_primary,
      fontSize: FontSize.LARGE,
    },
    headerTintColor: colors.text_primary,
    headerTransparent: false,
    headerBlurEffect: 'prominent',
    headerShadowVisible: false,
    headerTitle: title,
  };

  if (!stackWrapped) {
    return <Stack.Screen options={headerStylesOptions} />;
  }
  return <Stack screenOptions={headerStylesOptions} />;
};
