import ModalView from '@/components/base/ModalView';
import MenuItem from '../base/MenuItem';
import TextBlock from '../base/TextBlock';
import AccountForm from '../forms/AccountForm';
import ScrollContainer from '../base/ScrollContainer';

type Props = {
  menuItem: object,
};

const AccountScreen = ({menuItem}: Props) => {
  return (
    <ModalView 
      title={<TextBlock>{menuItem.label}</TextBlock>} 
      animation="fade"
      label={<MenuItem label={menuItem.label} />}
      content={
        <ScrollContainer>
          <AccountForm />
        </ScrollContainer>
      }
    />    
  );
};

export default AccountScreen;