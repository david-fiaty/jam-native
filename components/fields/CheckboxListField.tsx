import { StyleSheet, View, FlatList, TouchableOpacity } from 'react-native';
import { CheckBox } from '@rneui/themed';
import ModalView from '@/components/base/ModalView';
import TextBlock from '../base/TextBlock';
import { GlobalStyles, Colors } from '@/constants/GlobalStyles';
import SecondaryIcon from '../icons/SecondaryIcon';
import InputTextField from './InputTextField';
import ScrollContainer from '../base/ScrollContainer';

type Props = {
  label: JSX.Element,
  title: JSX.Element,
  data: object,
};

const CheckboxListField = ({label, title, data}: Props) => {
  return (
    <ModalView 
      title={title} 
      animation="slide"
      label={label}
      content={
        <ScrollContainer>
          <InputTextField placeholder="Search users" />
          <FlatList 
            data={data} 
            horizontal={false}  
            numColumns={1}
            style={styles.list}
            contentContainerStyle={{gap: GlobalStyles.space.base}}
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
                        size={GlobalStyles.space.base*2}
                        checked={true} 
                        checkedColor={Colors.primary}
                      />
                    </View>
                  </View>
                </TouchableOpacity>
              );
            }}
          />
        </ScrollContainer>
      }
    /> 
  );
};

const styles = StyleSheet.create({
  list: {
    width: '100%',
    marginTop: GlobalStyles.space.base*2,
    borderWidth: 1,
    borderColor: Colors.primary,
    borderRadius: GlobalStyles.space.base,
    padding: GlobalStyles.space.base,
  },
  item: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: GlobalStyles.space.base,
  },
  left: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: GlobalStyles.space.base,
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