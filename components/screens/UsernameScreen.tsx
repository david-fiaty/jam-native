import ModalView from '@/components/base/ModalView';
import ProfileForm from '@/components/profile/ProfileForm';
import ProfileImage from '@/components/profile/ProfileImage';
import ProfileJams from '@/components/profile/ProfileJams';
import ProfileProjects from '@/components/profile/ProfileProjects';
import MenuItem from '../base/MenuItem';
import TextBlock from '../base/TextBlock';
import ScrollContainer from '../base/ScrollContainer';

type Props = {
  menuItem: object,
};

const UsernameScreen = ({menuItem}: Props) => {
  return (
    <ModalView 
      title={<TextBlock>{menuItem.label}</TextBlock>} 
      animation="fade"
      showBackButton={true}
      label={<MenuItem label={menuItem.label} />}
      content={
        <ScrollContainer>
          <ProfileImage />
          <ProfileForm />
          <ProfileProjects />
          <ProfileJams />
        </ScrollContainer>
      }
    />    
  );
};

export default UsernameScreen;