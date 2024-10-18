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
        animation="slide"
        showBackButton={true}
        showBorder={true}
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
                <View style={styles.item}>
                  <SecondaryIcon name="user" />
                  <TextBlock>{item.name} / {item.handle}</TextBlock>
                </View>
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
  label: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: GlobalStyles.space.base,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: GlobalStyles.space.base,
    padding: GlobalStyles.space.base,
  },
});

export default JamHosts;