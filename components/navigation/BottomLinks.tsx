import { View, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { Button } from '@rneui/themed';
import { GlobalStyles } from '@/constants/GlobalStyles';

const BottomLinks = () => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Button 
        title="About" 
        type="clear" 
        onPress={() => router.push('/about')} 
        titleStyle={GlobalStyles.text}
      />
      <Button 
        title="Legal" 
        type="clear" 
        onPress={() => router.push('/legal')} 
        titleStyle={styles.text}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  text: GlobalStyles.text,
});

export default BottomLinks;