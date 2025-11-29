import { Tabs } from 'expo-router';
import { Platform, StyleSheet } from 'react-native';

import { Floater } from '@/components/Floater';
import { HapticTab } from '@/components/HapticTab';
import { IconSymbol, type IconSymbolName } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { SongWidget } from '@/features/songs/ui/song-widget';
import { useTheme } from '@/hooks/useThemeColor';
import { useMediaPlayer } from '@/library/music-player/hooks';

type TabData = {
  name: string;
  title: string;
  iconName: IconSymbolName;
};
const tabList: ReadonlyArray<TabData> = [
  {
    name: '(songs)',
    title: 'Songs',
    iconName: 'music.mic',
  },
  {
    name: 'favourites',
    title: 'Favourites',
    iconName: 'heart',
  },
  {
    name: 'artists',
    title: 'Artists',
    iconName: 'person.crop.circle',
  },
  {
    name: 'playlists',
    title: 'Playlists',
    iconName: 'play.circle',
  },
];

const App = () => {
  const color = useTheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: color.tint,
        tabBarLabelStyle: {
          fontWeight: 500,
          marginBottom: -5, // Move label up by increasing bottom margin negativity
        },
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: 'absolute',
            height: 50
          },
          default: {
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
          },
        }),
      }}
    >
      {tabList.map((tab) => (
        <Tabs.Screen
          key={tab.title}
          name={tab.name}
          options={{
            title: tab.title,
            headerShown: false,
            tabBarIcon: ({ color }) => <IconSymbol size={16} name={tab.iconName} color={color} />,
          }}
        />
      ))}
    </Tabs>
  );
};

const Layout = () => {
  const mediaPlayer = useMediaPlayer();
  return (
    <>
      <App />
      {mediaPlayer.track && (
        <Floater position="bottom" style={styles.widgetFloat}>
          <SongWidget
            data={mediaPlayer.track as never}
            onPause={mediaPlayer.pause}
            onPlay={mediaPlayer.resume}
            isPaused={mediaPlayer.isPaused}
          />
        </Floater>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  widgetFloat: {
    width: '100%',
    paddingHorizontal: 16,
    bottom: 55,
    backgroundColor: 'transparent',
  },
});

export default Layout;
