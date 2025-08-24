import React, { useState, useEffect } from "react";
import ProfileView from "@/components/view/ProfileView";
import UserManager from "@/manager/UserManager";
import SpinnerView from "@/components/view/SpinnerView";

type Props = {
  profileId?: any;
};

const PublicProfileSection = ({ profileId }: Props) => {
  const [profileData, setProfileData] = useState<any>(null);

  const getProfileData = async () => {
    let data: any = await UserManager.getProfileData({ profile_id: profileId || null });

    console.log(data)

    return data;
  };

  useEffect(() => {
    (async () => {
      if (!profileData) {
        setProfileData(await getProfileData());
      }
    })();
  }, [profileData, profileId]);

  if (!profileData) return <SpinnerView />;

  return (
    <ProfileView 
      profileId={profileId} 
      profileData={profileData} 
      isPublic={true}
    />
  );
};

export default PublicProfileSection;