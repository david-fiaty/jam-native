import { StyleSheet, View, FlatList, Text } from 'react-native';
import { Colors, GlobalStyles } from '@/constants/GlobalStyles';
import ModalView from '../ModalView';
import ApiClient from '@/classes/ApiClient';
import UserIcon from '../icons/UserIcon';
import TextBlock from '../base/TextBlock';

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
            <TextBlock>@host +{item.host_count}</TextBlock>
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
                    <TextBlock>{item.name} / {item.handle}</TextBlock>
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
    gap: GlobalStyles.space,
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 4,
    paddingBottom: 8,
    gap: GlobalStyles.space,
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