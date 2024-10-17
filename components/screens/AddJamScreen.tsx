import ModalView from '@/components/base/ModalView';
import JamForm from '../forms/JamForm';
import ClearIcon from '../icons/ClearIcon';
import { GlobalStyles } from '@/constants/GlobalStyles';
import ScrollContainer from '../base/ScrollContainer';

const AddJamScreen = () => {
  return (
    <ModalView 
      title="Add a new Jam" 
      animation="fade"
      label={<ClearIcon name="plus" size={GlobalStyles.footer.icon.size} />}
      content={
        <ScrollContainer>
          <JamForm />
        </ScrollContainer>
      }
    />   
  );
};

export default AddJamScreen;