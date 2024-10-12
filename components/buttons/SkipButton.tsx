import { StyleSheet, View, Text, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { GlobalStyles } from '@/constants/GlobalStyles';

type Props = {
  size?: number,
};

export function SkipButton({size}: Props) {
  size = size ? size : GlobalStyles.icon.size;
  const router = useRouter();
  
  return (
    <Pressable onPress={() => router.push('/jams')}>
      <View style={styles.container}>
        <Text style={GlobalStyles.text}>skip</Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default SkipButton;