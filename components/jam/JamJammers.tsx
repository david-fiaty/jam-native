import { StyleSheet, View, FlatList, Text } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { GlobalStyles } from '@/constants/GlobalStyles';
import AsteriskIcon from '../icons/AsteriskIcon';
import ModalWindow from '../ModalWindow';

const JamJammers = () => {
  return (
    <View style={styles.container}>   
      <ModalWindow 
        label={<AsteriskIcon />}
        title="Jammers" 
        content={
          <FlatList 
            data={data} 
            horizontal={false}  
            style={styles.list}
            renderItem={({item, index}) => {
              return (
                <View style={styles.row}>
                  <FontAwesome name="user-circle" size={32} color={GlobalStyles.icon.color} />
                  <Text style={styles.text}>Jammer {index}</Text>
                </View>
              );
            }} 
          />
        }
        animation="slide"
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
  text: GlobalStyles.text,
  row: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 8,
    paddingBottom: 8,
    gap: 16,
  }
});

const data = [
  {
    'label': 'Account information',
    'path': '/jams',
  },
  {
    'label': 'Change password',
    'path': '/jams',
  },
  {
    'label': 'Change user name',
    'path': '/jams',
  },
  {
    'label': 'Delete account',
    'path': '/jams',
  },
];

export default JamJammers;