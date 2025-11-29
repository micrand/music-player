/**
 * @file _layout.tsx
 * @description The Root Layout Route for the application.
 *
 * This file is the foundational layout for an Expo Router project. It defines the
 * UI that wraps every single screen in your app. This is the correct place to
 * initialize global services, providers, and define the top-most navigation structure.
 *
 * **Key Responsibilities:**
 * - **Asset Loading:** Asynchronously loads fonts and other critical assets.
 * - **Splash Screen Control:** Manages the display and hiding of the native splash screen to ensure a smooth user experience.
 * - **Global Providers:** Wraps the app in necessary providers like `SafeAreaProvider` and `GestureHandlerRootView`.
 * - **Navigation Structure:** Defines the root navigator (e.g., `Stack`) and its initial routes.
 *
 * **Best Practices:**
 * - Keep this file focused on global setup. Avoid adding screen-specific logic here.
 * - Load all custom fonts in this file to ensure they are available everywhere.
 * - Always wrap your app with `GestureHandlerRootView` if you use `react-native-gesture-handler`.
 * - The provider order matters. `GestureHandlerRootView` should generally be the outermost.
 *
 */

import { DarkTheme, ThemeProvider } from '@react-navigation/native';
import { StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

import { MediaPlayerProvider } from '@/library/music-player';
import { ReduxProvider } from '@/redux/ReduxProvider';
import { FC, PropsWithChildren } from 'react';

const App = () => (
  <Stack initialRouteName="(tabs)">
    <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    <Stack.Screen
      name="player"
      options={{
        presentation: 'card',
        gestureEnabled: true,
        gestureDirection: 'vertical',
        animationDuration: 400,
        headerShown: false,
      }}
    />
  </Stack>
);

const Providers: FC<PropsWithChildren> = ({ children }) => (
  <ThemeProvider value={DarkTheme}>
    <GestureHandlerRootView>
      <ReduxProvider>
        <MediaPlayerProvider>{children}</MediaPlayerProvider>
      </ReduxProvider>
    </GestureHandlerRootView>
  </ThemeProvider>
);

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require('@/assets/fonts/SpaceMono-Regular.ttf'),
  });
  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }
  return (
    <Providers>
      <SafeAreaProvider>
        <SafeAreaView style={styles.container}>
          <App />
          <StatusBar style="auto" />
        </SafeAreaView>
      </SafeAreaProvider>
    </Providers>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
