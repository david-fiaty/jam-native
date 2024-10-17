
import { useState } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { GlobalStyles, Colors } from '@/constants/GlobalStyles';
import ClearIcon from '../icons/ClearIcon';

const FooterBar = () => {
  const router = useRouter();
  const [isActive, setIsActive] = useState(false);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => {
        setIsActive(!isActive);
        router.replace('/jams');
      }}>
        <ClearIcon name="location" size={GlobalStyles.footer.icon.size} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => {
        setIsActive(!isActive);
        router.replace('/map');
      }}>
        <ClearIcon name="location" size={GlobalStyles.footer.icon.size} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => {
        setIsActive(!isActive);
        router.replace('/add-jam');
      }}>
        <ClearIcon name="plus" size={GlobalStyles.footer.icon.size} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => {
        setIsActive(!isActive);
        router.replace('/profile');
      }}>
        <ClearIcon name="user" size={GlobalStyles.footer.icon.size} />
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