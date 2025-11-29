// Fallback for using MaterialIcons on Android and web.

import FontAwesome from '@expo/vector-icons/FontAwesome';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { SymbolViewProps, SymbolWeight } from 'expo-symbols';
import { ComponentProps } from 'react';
import { OpaqueColorValue, type StyleProp, type TextStyle } from 'react-native';

type IconMapping = Record<SymbolViewProps['name'], ComponentProps<typeof FontAwesome6>['name']>;
export type IconSymbolName = keyof typeof MAPPING;

/**
 * Add your SF Symbols to Material Icons mappings here.
 * - see Material Icons in the [Icons Directory](https://icons.expo.fyi).
 * - see SF Symbols in the [SF Symbols](https://developer.apple.com/sf-symbols/) app.
 */
const MAPPING = {
  'house.fill': 'home',
  'paperplane.fill': 'send',
  'chevron.left.forwardslash.chevron.right': 'code',
  'chevron.right': 'chevron-right',
  heart: 'heart',
  'play.circle': 'play-circle',
  'music.mic': 'music',
  'person.crop.circle': 'users',
  ellipsis: 'ellipsis',
  play: 'play',
  forward: 'forward',
  backward: 'backward',
  pause: 'pause',
  repeat: 'repeat',
  'speaker.minus': 'volume-low',
  'speaker.plus': 'volume-high',
} as IconMapping;

const Mapper: Record<string, typeof FontAwesome | typeof FontAwesome6> = {
  heart: FontAwesome,
  default: FontAwesome6,
};

/**
 * An icon component that uses native SF Symbols on iOS, and Material Icons on Android and web.
 * This ensures a consistent look across platforms, and optimal resource usage.
 * Icon `name`s are based on SF Symbols and require manual mapping to Material Icons.
 */
export function IconSymbol({
  name,
  size = 24,
  color,
  style,
}: {
  name: IconSymbolName;
  size?: number;
  color: string | OpaqueColorValue;
  style?: StyleProp<TextStyle>;
  weight?: SymbolWeight;
}) {
  const Tag = Mapper[name] ?? Mapper.default;
  return <Tag color={color} size={size} name={MAPPING[name]} style={style} />;
}
