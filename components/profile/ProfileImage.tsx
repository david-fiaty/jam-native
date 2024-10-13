import { StyleSheet, View } from 'react-native';
import { Button } from '@rneui/themed';
import Ionicons from '@expo/vector-icons/Ionicons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { GlobalStyles } from '@/constants/GlobalStyles';
import TextBlock from '@/components/base/TextBlock';

const ProfileImage = () => {
  return (
    <View style={styles.container}>
      <FontAwesome name="user-circle" size={86} color={GlobalStyles.icon.color} />
      <Button 
        type="outline" 
        buttonStyle={styles.button} 
        titleStyle={GlobalStyles.text}
        onPress={() => console.log('Clicked') } 
      >
        <Ionicons name="cloud-upload-outline" size={20} color={GlobalStyles.icon.color} />
        <TextBlock>Upload an image</TextBlock> 
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: GlobalStyles.space,
    marginBottom: GlobalStyles.space*2,
  },
  button: {
    borderRadius: 30,
    overflow: 'hidden',
    gap: GlobalStyles.space,
  },
});

export default ProfileImage;