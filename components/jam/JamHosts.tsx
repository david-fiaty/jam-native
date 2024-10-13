import { StyleSheet, View, FlatList } from 'react-native';
import { GlobalStyles } from '@/constants/GlobalStyles';
import ModalView from '@/components/base/ModalView';
import ApiClient from '@/classes/ApiClient';
import TextBlock from '@/components/base/TextBlock';
import SecondaryIcon from '../icons/SecondaryIcon';

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
          <FlatList 
            data={data} 
            horizontal={false}  
            style={styles.list}
            renderItem={({item, index}) => {
              return (
                <View style={styles.row}>
                  <SecondaryIcon name="user" />
                  <TextBlock>{item.name} / {item.handle}</TextBlock>
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
});

export default JamHosts;