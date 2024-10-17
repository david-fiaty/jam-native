
import ClearIcon from '../icons/ClearIcon';
import ModalView from '@/components/base/ModalView';
import ProfileForm from '@/components/profile/ProfileForm';
import ProfileImage from '@/components/profile/ProfileImage';
import ProfileJams from '@/components/profile/ProfileJams';
import ProfileProjects from '@/components/profile/ProfileProjects';
import { GlobalStyles } from '@/constants/GlobalStyles';
import ScrollContainer from '../base/ScrollContainer';

const ProfileScreen = () => {
  return (
    <ModalView 
      title="Your profile" 
      animation="fade"
      label={<ClearIcon name="user" size={GlobalStyles.footer.icon.size} />}
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

export default ProfileScreen;