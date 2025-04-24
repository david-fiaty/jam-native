import { Layout } from "@/constants/Layout";
import ProfileForm from "../form/ProfileForm";
import BoxView from "../view/BoxView";


const ProfileSection = () => {
  return (
    <BoxView
      direction="column"
      align="center"
      justify="center"
      style={Layout.screenContent}
      scroll={true}
    >
      <ProfileForm resource="profile" />
    </BoxView>
  );
};

export default ProfileSection;