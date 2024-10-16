import ModalView from '@/components/base/ModalView';
import MenuItem from '../base/MenuItem';
import TextBlock from '../base/TextBlock';
import LanguageForm from '../forms/LanguageForm';
import ScrollContainer from '../base/ScrollContainer';

type Props = {
  menuItem: object,
};

const LanguageScreen = ({menuItem}: Props) => {
  return (
    <ModalView 
      title={<TextBlock>{menuItem.label}</TextBlock>} 
      animation="fade"
      label={<MenuItem label={menuItem.label} />}
      content={
        <ScrollContainer>
          <LanguageForm />
        </ScrollContainer>
      }
    />    
  );
};

export default LanguageScreen;