import React, { useState, useEffect } from "react";
import ProfileView from "@/components/view/ProfileView";
import UserManager from "@/manager/UserManager";

const PrivateProfileSection = () => {
  const [profileData, setProfileData] = useState<any>(null);

  useEffect(() => {
    (async () => {
      if (!profileData) {
        setProfileData(await UserManager.getProfileData());
      }
    })();
  }, [profileData]);

  return (
    <ProfileView 
      profileId={profileData?.id} 
      profileData={profileData} 
    />
  );
};

export default PrivateProfileSection;