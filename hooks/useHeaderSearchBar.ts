import { useCallback, useLayoutEffect, useState } from 'react';
import { SearchBarProps } from 'react-native-screens';

import { Colors } from '@/constants/tokens';
import { useNavigation } from 'expo-router';
import { NativeSyntheticEvent as Event, TextInputFocusEventData as Target } from 'react-native';

const defaultOptions: SearchBarProps = {
  tintColor: Colors.dark.tint,
  hideWhenScrolling: false,
};

export const useHeaderSearch = (options: SearchBarProps) => {
  const [search, setSearch] = useState('');

  const navigation = useNavigation();

  const onChangeTextHandler: SearchBarProps['onChangeText'] = useCallback(
    (event: Event<Target>) => {
      setSearch(event.nativeEvent.text);
    },
    [],
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      headerSearchBarOptions: {
        ...defaultOptions,
        ...options,
        onChangeText: onChangeTextHandler,
      },
    });
  }, [navigation, options]);

  return search;
};
