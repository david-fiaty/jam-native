import ProfileView from "@/components/view/ProfileView";

type Props = {
  profileId?: any;
};

const PublicProfileSection = ({ profileId }: Props) => {
  return <ProfileView />;
};

export default PublicProfileSection;