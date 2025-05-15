// app/_layout.tsx
import { Stack } from 'expo-router';
import Navbar from './(tabs)/Navbar'; // ✅ Make sure this path is correct

export default function Layout() {
  return (
    <>
      <Navbar />
      <Stack />
    </>
  );
}
