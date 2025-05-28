import { useState, useEffect } from "react";
import { StyleSheet } from 'react-native';
import { Layout } from '@/constants/Layout';
import EntityManager from "@/manager/EntityManager";
import ProfileItemView from "../view/ProfileItemView";
import SpinnerView from "../view/SpinnerView";

type Props = {
  profileId: any;
};

const ProfileItemSection = ({ profileId }: Props) => {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [profileItem, setProfileItem] = useState<any>(null);
  profileId = parseInt(profileId);

  useEffect(() => {
    (async () => {
      if (!isLoaded) {
        setProfileItem((await EntityManager.getProfiles([profileId]))?.[0]);
        setIsLoaded(true);
      }
    })();
  }, [isLoaded, profileId]);

  if (!isLoaded) return <SpinnerView />;

  if (!profileId || isNaN(profileId)) {
    return <></>;
  }

  return <ProfileItemView profileId={profileId} />;
};

const styles = StyleSheet.create({
  title: {
    fontWeight: 'bold',
    marginTop: Layout.space.base,
  },
});

export default ProfileItemSection;
