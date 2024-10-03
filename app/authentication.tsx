import { StyleSheet, Image, Platform } from 'react-native';
import { ThemedText } from '@/components/ThemedText';

export default function AuthenticationScreen() {
  return (
    <ThemedText type="title">AuthenticationScreen</ThemedText>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
});
