import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import ProfileView from "@/components/view/ProfileView";
import UserManager from "@/manager/UserManager";

const PrivateProfileSection = () => {
  const [profileData, setProfileData] = useState<any>(null);
  const userState = useSelector((state: any) => state.user);

  useEffect(() => {
    (async () => {
      if (!profileData) {
        setProfileData(userState.profileData);
      }
    })();
  }, [profileData, userState]);

  return (
    <ProfileView 
      profileId={profileData?.id} 
      profileData={profileData} 
    />
  );
};

export default PrivateProfileSection;