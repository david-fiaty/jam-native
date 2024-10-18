import ModalView from '@/components/base/ModalView';
import MenuItem from '../base/MenuItem';
import TextBlock from '../base/TextBlock';
import PasswordForm from '../forms/PasswordForm';
import ScrollContainer from '../base/ScrollContainer';

type Props = {
  menuItem: object,
};

const PasswordScreen = ({menuItem}: Props) => {
  return (
    <ModalView 
      title={<TextBlock>{menuItem.label}</TextBlock>} 
      animation="fade"
      showBackButton={true}
      label={<MenuItem label={menuItem.label} />}
      content={
        <ScrollContainer>
          <PasswordForm />
        </ScrollContainer>
      }
    />    
  );
};

export default PasswordScreen;