import React, { useState, useEffect } from "react";
import ProfileView from "@/components/view/ProfileView";
import UserManager from "@/manager/UserManager";

type Props = {
  profileId?: any;
};

const PublicProfileSection = ({ profileId }: Props) => {
  const [profileData, setProfileData] = useState<any>(null);

  useEffect(() => {
    (async () => {
      if (!profileData) {
        setProfileData(await UserManager.getProfileData({ profile_id: profileId || null }));
      }
    })();
  }, [profileData, profileId]);

  return (
    <ProfileView 
      profileId={profileId} 
      profileData={profileData} 
    />
  );
};

export default PublicProfileSection;