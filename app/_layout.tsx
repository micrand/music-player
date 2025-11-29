import { Stack } from "expo-router";
import { AudioProvider } from "./audio-provider";
import MiniPlayer from "../components/MiniPlayer";

export default function RootLayout() {
  return (
    <AudioProvider>
      <Stack screenOptions={{ headerShown: false }} />
      <MiniPlayer />
    </AudioProvider>
  );
}
