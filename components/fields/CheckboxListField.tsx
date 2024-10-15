import { StyleSheet, View, ScrollView, FlatList, TouchableOpacity } from 'react-native';
import ModalView from '@/components/base/ModalView';
import TextBlock from '../base/TextBlock';
import { GlobalStyles, Colors } from '@/constants/GlobalStyles';

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
              numColumns={1}
              contentContainerStyle={{gap: GlobalStyles.space}}
              columnWrapperStyle={{gap: GlobalStyles.space}}
              scrollEnabled={false}
              renderItem={({item, index}) => {
                return (
                  <TouchableOpacity onPress={() => console.log('clicked')}>
                    <View style={styles.container}>
                      <TextBlock>{item.name}</TextBlock>   
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
  container: {},
  item: {},
  scroll: {
    flexGrow: 1,
  },  
});

export default CheckboxListField;