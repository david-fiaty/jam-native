import ProfileView from "@/components/view/ProfileView";

type Props = {
  profileId?: any;
  itemData?: any;
};

const PublicProfileSection = ({ profileId, itemData }: Props) => {
  return (
    <ProfileView 
      profileId={profileId} 
      isPublic={true}
      itemData={itemData}
    />
  );
};

export default PublicProfileSection;