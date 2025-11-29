import { Audio } from "expo-av";
import type { Track } from "../types/track";

class AudioService {
  private sound: Audio.Sound | null = null;

  async load(track: Track) {
    if (this.sound) {
      await this.sound.stopAsync();
      await this.sound.unloadAsync();
    }
    this.sound = new Audio.Sound();
    await this.sound.loadAsync(track.uri);
  }

  async play() {
    if (!this.sound) return;
    await this.sound.playAsync();
  }

  async pause() {
    if (!this.sound) return;
    await this.sound.pauseAsync();
  }

  async getStatus() {
    if (!this.sound) return null;
    return await this.sound.getStatusAsync();
  }
}

export default new AudioService();
