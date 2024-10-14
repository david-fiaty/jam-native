import { StyleSheet } from 'react-native';
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
      content={<JamForm />}
    />   
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default AddJamScreen;