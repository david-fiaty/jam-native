import { StyleSheet, ScrollView, Pressable } from 'react-native';
import ModalView from '@/components/base/ModalView';
import JamForm from '../forms/JamForm';
import ClearIcon from '../icons/ClearIcon';
import { GlobalStyles } from '@/constants/GlobalStyles';

const AddJamScreen = () => {
  return (
    <ModalView 
      title="Add a new Jam" 
      animation="fade"
      label={<ClearIcon name="plus" size={GlobalStyles.tabsbar.icon.size} />}
      content={
        <ScrollView 
          nestedScrollEnabled={true}
          contentContainerStyle={{ flexGrow: 1 }}
        >
          <Pressable>
            <JamForm />
          </Pressable>
        </ScrollView>
      }
    />   
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default AddJamScreen;