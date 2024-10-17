import ProfileForm from '@/components/profile/ProfileForm';
import ProfileImage from '@/components/profile/ProfileImage';
import ProfileJams from '@/components/profile/ProfileJams';
import ProfileProjects from '@/components/profile/ProfileProjects';
import ScrollContainer from '../base/ScrollContainer';

const ProfileScreen = () => {
  return (
    <ScrollContainer>
      <ProfileImage />
      <ProfileForm />
      <ProfileProjects />
      <ProfileJams />
    </ScrollContainer>   
  );
};

export default ProfileScreen;