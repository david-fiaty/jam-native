import { StyleSheet, Text, View } from 'react-native';
import { Button } from '@rneui/themed';
import Ionicons from '@expo/vector-icons/Ionicons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { GlobalStyles } from '@/constants/GlobalStyles';

const ProfileImage = () => {
  return (
    <View style={styles.image}>
      <FontAwesome name="user-circle" size={86} color={GlobalStyles.icon.color} />
      <Button 
        type="outline" 
        buttonStyle={styles.button} 
        titleStyle={GlobalStyles.text}
        onPress={() => console.log('Clicked') } 
      >
        <Ionicons name="cloud-upload-outline" size={20} color={GlobalStyles.icon.color} />
        <Text style={GlobalStyles.text}>Upload an image</Text> 
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    paddingBottom: 20,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: GlobalStyles.gap,
  },
  button: {
    borderRadius: 30,
    overflow: 'hidden',
    paddingTop: 5,
    paddingBottom: 5,
    gap: GlobalStyles.gap,
  },
});

export default ProfileImage;