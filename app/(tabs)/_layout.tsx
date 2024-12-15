import { Tabs } from 'expo-router';
import { Fragment } from 'react';
import { StyleSheet } from 'react-native';

export default function TabsLayout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
          headerTitle: 'Sticker Smash',
        }}
      />
      <Tabs.Screen
        name="about"
        options={{
          headerTitle: 'About',
        }}
      />
      <Tabs.Screen
        name="not-found"
        options={{
          headerShown: false,
        }}
      />
    </Tabs>
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
