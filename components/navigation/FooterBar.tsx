
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import MapScreen from '@/components/screens/MapScreen';
import AddJamScreen from '@/components/screens/AddJamScreen';
import ProfileScreen from '@/components/screens/ProfileScreen';
import { GlobalStyles, Colors } from '@/constants/GlobalStyles';
import TextBlock from '../base/TextBlock';
import ClearIcon from '../icons/ClearIcon';

const FooterBar = () => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => router.push('/map')}>
        <ClearIcon name="location" size={GlobalStyles.footer.icon.size} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => router.push('/add-jam')}>
        <AddJamScreen />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => router.push('/profile')}>
        <ProfileScreen />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    bottom: 0,
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '100%',
    padding: GlobalStyles.space.base,
    backgroundColor: Colors.background,
    borderTopWidth: 1,
    borderTopColor: Colors.primary,
  },
});

export default FooterBar;