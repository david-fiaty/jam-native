import { StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { Button } from '@rneui/themed';
import { GlobalStyles } from '@/constants/GlobalStyles';

const SkipButton = () => {
  const router = useRouter();

  return (
    <Button 
      title="Skip" 
      type="clear" 
      titleStyle={styles.text} 
      onPress={() => router.push('/jams')} 
    />
  );
};

const styles = StyleSheet.create({
  text: GlobalStyles.text,
});

export default SkipButton;