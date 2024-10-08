import { StyleSheet, View, FlatList, Text } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { GlobalStyles } from '@/constants/GlobalStyles';
import ModalWindow from '../ModalWindow';

type Props = {
  item: object,
  index: number,
};

const JamJammers = ({item, index}: Props) => {
  return (
    <View style={styles.container}>   
      <ModalWindow 
        label={
          <View style={styles.label}>
            <MaterialCommunityIcons name="asterisk" size={16} color={GlobalStyles.icon.color} />
            <Text style={GlobalStyles.text}>{item.host_count} jammers</Text>
          </View>
        }
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
                  <Text style={GlobalStyles.text}>Jammer {index}</Text>
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
  label: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
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