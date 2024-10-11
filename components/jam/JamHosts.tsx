import { StyleSheet, View, FlatList, Text } from 'react-native';
import { Colors, GlobalStyles } from '@/constants/GlobalStyles';
import ModalView from '../ModalView';
import ApiClient from '@/classes/ApiClient';
import UserIcon from '../icons/UserIcon';

type Props = {
  item: object,
  index: number,
};

const JamHosts = ({item, index}: Props) => {
  const data = ApiClient.get('hosts');

  return (
    <View style={styles.container}>   
      <ModalView 
        title="Hosts" 
        label={
          <View style={styles.label}>
            <Text style={GlobalStyles.text}>@host +{item.host_count}</Text>
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
                    <UserIcon size={22} />
                    <Text style={GlobalStyles.text}>{item.name} / {item.handle}</Text>
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

export default JamHosts;