import ProfileView from "@/components/view/ProfileView";

type Props = {
  profileId?: any;
};

const PublicProfileSection = ({ profileId }: Props) => {
  return (
    <ProfileView 
      profileId={profileId} 
      isPublic={true}
    />
  );
};

export default PublicProfileSection;