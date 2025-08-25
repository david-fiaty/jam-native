import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import ProfileView from "@/components/view/ProfileView";
import UserManager from "@/manager/UserManager";
import SpinnerView from "@/components/view/SpinnerView";

type Props = {
  profileId?: any;
};

const PublicProfileSection = ({ profileId }: Props) => {
  const [profileData, setProfileData] = useState<any>(null);
  const searchState = useSelector((state: any) => state.search);

  const getProfileData = async () => {
    let currentResults: any = JSON.parse(searchState.currentResults);
    let data: any = (currentResults.profile || []).find((o: any) => o.id == profileId);

    if (!data) {
      data = await UserManager.getProfileData({ profile_id: profileId || null });
    }     

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