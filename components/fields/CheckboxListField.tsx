import { StyleSheet, View, ScrollView, FlatList, TouchableOpacity } from 'react-native';
import { CheckBox } from '@rneui/themed';
import ModalView from '@/components/base/ModalView';
import TextBlock from '../base/TextBlock';
import { GlobalStyles, Colors } from '@/constants/GlobalStyles';
import ClearIcon from '../icons/ClearIcon';
import SecondaryIcon from '../icons/SecondaryIcon';

type Props = {
  label: JSX.Element,
  title: JSX.Element,
  data: object,
};

const CheckboxListField = ({label, title, data}: Props) => {
  console.log(data);

  return (
    <View style={styles.container}>    
      <ModalView 
        title={title} 
        animation="slide"
        label={label}
        content={
          <ScrollView 
            nestedScrollEnabled={true}
            contentContainerStyle={{ flexGrow: 1 }}
          >
            <FlatList 
              data={data} 
              horizontal={false}  
              numColumns={1}
              style={styles.list}
              contentContainerStyle={{gap: GlobalStyles.space}}
              scrollEnabled={false}
              renderItem={({item, index}) => {
                return (
                  <TouchableOpacity onPress={() => console.log('clicked')}>
                    <View style={styles.item}>
                      <View style={styles.left}>
                        <SecondaryIcon name="user" />
                        <TextBlock>{item.name}</TextBlock>
                      </View>
                      <View style={styles.right}>
                        <CheckBox 
                          iconRight={true}
                          containerStyle={styles.checkbox} 
                          checked={true} 
                        />
                      </View>
                    </View>
                  </TouchableOpacity>
                );
              }}
            />
          </ScrollView>  
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
  item: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: GlobalStyles.space,
  },
  left: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: GlobalStyles.space,
  },
  right: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  scroll: {
    flexGrow: 1,
  },  
  checkbox: {
    padding: 0,
    margin: 0,
  },
});

export default CheckboxListField;