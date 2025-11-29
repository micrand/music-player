/**
 * @file Color.ts
 * @description Centralized color palette for the application.
 * 
 * This file defines all color constants used throughout the app, organized by
 * semantic purpose (primary, secondary, background, text, etc.) and theme
 * (light/dark modes).
 * 
 * Usage: Import colors from this file rather than defining color values inline
 * to maintain consistency across the application.
 */

const tintColorLight = '#169ac6ff';
const tintColorDark = '#8e1336ff';

export const Colors = {
  light: {
    text_primary: '#11181C',
    text_secondary: '#9b9b9bff',
    text_highlight: tintColorLight,
    background: '#ffffff',
    tint: tintColorLight,
    icon: '#7e878eff',
    tabIconDefault: '#737b81ff',
    tabIconSelected: tintColorLight,
  },
  dark: {
    text_primary: '#0e365fff',
    text_secondary: '#939393ff',
    text_highlight: tintColorDark,
    background: '#1a1a1b52',
    tint: tintColorDark,
    icon: '#9c9e9fff',
    tabIconDefault: '#818283ff',
    tabIconSelected: tintColorDark,
  },
};
