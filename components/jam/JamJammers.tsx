import { StyleSheet, View, FlatList } from 'react-native';
import { Colors, GlobalStyles } from '@/constants/GlobalStyles';
import ModalView from '@/components/base/ModalView';
import ApiClient from '@/classes/ApiClient';
import StaticIcon from '../base/StaticIcon';
import UserIcon from '../icons/UserIcon';
import TextBlock from '@/components/base/TextBlock';

type Props = {
  item: object,
  index: number,
};

const JamJammers = ({item, index}: Props) => {
  const data = ApiClient.get('jammers');

  return (
    <View style={styles.container}>   
      <ModalView 
        title="Jammers" 
        label={
          <View style={styles.label}>
            <StaticIcon 
              name="users" 
              iconStyle={GlobalStyles.tabs.icon} 
              containerStyle={[GlobalStyles.icon.clear, styles.icon]}
              size={styles.icon.size} 
            />
            <TextBlock>{item.host_count} jammers</TextBlock>
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
                    <TextBlock>{item.name}</TextBlock>
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
      padding: GlobalStyles.space/1.5,
      borderRadius: 40,
      size: GlobalStyles.tabs.icon.size/1.5,
    },
  },
});

export default JamJammers;