import ModalView from '@/components/base/ModalView';
import MenuItem from '../base/MenuItem';
import TextBlock from '../base/TextBlock';
import ScrollContainer from '../base/ScrollContainer';

type Props = {
  menuItem: object,
};

const NotificationScreen = ({menuItem}: Props) => {
  return (
    <ModalView 
      title={<TextBlock>{menuItem.label}</TextBlock>} 
      animation="fade"
      showBackButton={true}
      label={<MenuItem label={menuItem.label} />}
      content={
        <ScrollContainer>
          <TextBlock>{menuItem.content}</TextBlock>
        </ScrollContainer>
      }
    />    
  );
};

export default NotificationScreen;