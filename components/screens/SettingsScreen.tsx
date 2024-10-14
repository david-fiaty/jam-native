import { StyleSheet, View, FlatList } from 'react-native';
import { useRouter } from 'expo-router';
import MenuItem from '@/components/base/MenuItem';
import ModalView from '@/components/base/ModalView';
import SettingsScreenItems from '@/constants/SettingsScreenItems';
import TertiaryIcon from '../icons/TertiaryIcon';

const SettingsScreen = () => {
  const data = SettingsScreenItems;
  const router = useRouter();

  return (
    <View style={styles.container}>        
      <ModalView 
        title="Settings" 
        animation="slide"
        label={<TertiaryIcon name="menu" />}
        content={
          <FlatList 
            data={data} 
            horizontal={false}  
            style={styles.list}
            renderItem={({item, index}) => {
              return (
                <MenuItem 
                  item={item} 
                  index={index} 
                  onPress={() => {
                    router.push(item.path) 
                  }}
                />
              );
            }} 
          />
        }
      />   
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
  },
  list: {
    width: '100%',
  },
});

export default SettingsScreen;
