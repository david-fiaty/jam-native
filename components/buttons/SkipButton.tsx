import { StyleSheet, View, Text, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { GlobalStyles } from '@/constants/GlobalStyles';
import TextBlock from '../base/TextBlock';

type Props = {
  size?: number,
};

const SkipButton = ({size}: Props) => {
  size = size ? size : GlobalStyles.icon.size;
  const router = useRouter();
  
  return (
    <Pressable onPress={() => router.push('/jams')}>
      <View style={styles.container}>
        <TextBlock>skip</TextBlock>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default SkipButton;