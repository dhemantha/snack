import { useEffect } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useFrameworkReady } from '@/hooks/useFrameworkReady';
import * as eva from '@eva-design/eva';
import { ApplicationProvider } from '@ui-kitten/components';
import { ThemeProvider } from '@/context/ThemeContext';
import { customTheme } from '@/theme/customTheme';

export default function RootLayout() {
  useFrameworkReady();

  return (
    <ThemeProvider>
      <ApplicationProvider {...eva} theme={{ ...eva.light, ...customTheme }}>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" />
        </Stack>
        <StatusBar style="auto" />
      </ApplicationProvider>
    </ThemeProvider>
  );
}