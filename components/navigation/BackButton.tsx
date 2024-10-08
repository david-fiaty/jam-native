import { View, StyleSheet, Text } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import { GlobalStyles } from '@/constants/GlobalStyles';

type Props = {
  title: string,
  onPress?: () => void,
};

const BackButton = ({title, onPress}: Props) => {
  return (
    <View style={styles.container}>
      <AntDesign name="left" size={20} color={GlobalStyles.icon.color} />
      <Text style={styles.text}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 16,
    gap: 8,
  },
  text: {
    ...GlobalStyles.text,
    ...{
      fontSize: 16,
      fontWeight: 'bold',
    },
  },
});

export default BackButton;