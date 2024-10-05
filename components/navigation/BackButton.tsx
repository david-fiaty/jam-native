import { View, StyleSheet } from 'react-native';
import { Button } from '@rneui/themed';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';
import { GlobalStyles } from '@/constants/GlobalStyles';

type Props = {
  title: string,
  style: {},
};

const BackButton = ({title, style}: Props) => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <AntDesign name="left" size={20} color={GlobalStyles.icon.color} style={{marginTop: 8}} />
      <Button 
        title={title} 
        type="clear" 
        onPress={() => navigation.goBack()}
        titleStyle={[GlobalStyles.text, style]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'flex-start',
    flexDirection: 'row',
  },
});

export default BackButton;