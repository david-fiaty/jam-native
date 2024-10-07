import { View, StyleSheet } from 'react-native';
import { Button } from '@rneui/themed';
import AntDesign from '@expo/vector-icons/AntDesign';
import { GlobalStyles } from '@/constants/GlobalStyles';

type Props = {
  title: string,
  style?: {},
  onPress?: () => void,
};

const BackButton = ({title, style, onPress}: Props) => {
  return (
    <View style={styles.container}>
      <AntDesign name="left" size={20} color={GlobalStyles.icon.color} style={{marginTop: 8}} />
      <Button 
        title={title} 
        type="clear" 
        onPress={onPress}
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