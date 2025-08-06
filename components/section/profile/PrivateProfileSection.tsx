import ProfileView from "@/components/view/ProfileView";

type Props = {
  profileId?: any;
};

const PrivateProfileSection = ({ profileId }: Props) => {
  return <ProfileView />;
};

export default PrivateProfileSection;