import { StyleSheet, View, FlatList, Text } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Feather from '@expo/vector-icons/Feather';
import { Colors, GlobalStyles } from '@/constants/GlobalStyles';
import ModalView from '../ModalView';

type Props = {
  item: object,
  index: number,
};

const JamJammers = ({item, index}: Props) => {
  return (
    <View style={styles.container}>   
      <ModalView 
        title="Jammers" 
        label={
          <View style={styles.label}>
            <Feather
              name="users" 
              size={14} 
              style={styles.icon}
            />
            <Text style={GlobalStyles.text}>{item.host_count} jammers</Text>
          </View>
        }
        content={
          <View style={GlobalStyles.modal.wrapper}>
            <FlatList 
              data={data} 
              horizontal={false}  
              style={styles.list}
              renderItem={({item, index}) => {
                return (
                  <View style={styles.row}>
                    <FontAwesome name="user-circle" size={28} color={GlobalStyles.icon.color} />
                    <Text style={GlobalStyles.text}>Jammer {index}</Text>
                  </View>
                );
              }} 
            />
          </View>
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
    paddingTop: 4,
    paddingBottom: 8,
    gap: 12,
  },
  icon: {
    ...GlobalStyles.icon,
    ...{
      backgroundColor: Colors.secondary,
      padding: 6,
      borderRadius: 40,
    },
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