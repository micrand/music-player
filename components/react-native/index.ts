import { ThemedText as Text } from '../ThemedText';
import { ThemedView as View } from '../ThemedView';

import { StyleProp } from 'react-native/Libraries/StyleSheet/StyleSheet';
import { ViewStyle } from 'react-native/Libraries/StyleSheet/StyleSheetTypes';

export type ElementStyleProp = StyleProp<ViewStyle>;

export {
  Button,
  Dimensions,
  FlatList,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableHighlight,
  TouchableOpacity,
  VirtualizedList,
} from 'react-native';

export { Text, View };
