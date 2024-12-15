import { Stack } from 'expo-router';
import { Fragment } from 'react';
import { StyleSheet } from 'react-native';

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerTitle: 'Sticker Smash',
          headerLeft: () => <Fragment />,
        }}
      />
      <Stack.Screen
        name="about"
        options={{
          headerTitle: 'About',
        }}
      />
      <Stack.Screen
        name="not-found"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    justifyContent: 'center',
    alignItems: 'center',
  },

  button: {
    fontSize: 20,
    textDecorationLine: 'underline',
    color: '#fff',
  },
});
