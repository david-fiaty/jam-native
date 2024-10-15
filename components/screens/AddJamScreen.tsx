import { StyleSheet, View, ScrollView, Pressable, Dimensions } from 'react-native';
import ModalView from '@/components/base/ModalView';
import JamForm from '../forms/JamForm';
import ClearIcon from '../icons/ClearIcon';
import { GlobalStyles } from '@/constants/GlobalStyles';

const AddJamScreen = () => {
  return (
    <ModalView 
      title="Add a new Jam" 
      animation="slide"
      label={<ClearIcon name="plus" size={GlobalStyles.tabsbar.icon.size} />}
      content={
        <ScrollView 
          nestedScrollEnabled={true}
          contentContainerStyle={{ flexGrow: 1 }}
        >
          <Pressable>
            <View style={styles.container}>
              <JamForm />
            </View>
          </Pressable>
        </ScrollView>
      }
    />   
  );
};

const styles = StyleSheet.create({
  container: {
    height: Dimensions.get('window').height - GlobalStyles.toolbar.height - GlobalStyles.space*2,
  },
});

export default AddJamScreen;