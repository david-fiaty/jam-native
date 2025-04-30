import { useState, useEffect } from "react";
import { StyleSheet } from 'react-native';
import { Layout } from '@/constants/Layout';
import EntityManager from "@/manager/EntityManager";

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
        setProfileItem((await EntityManager.getProfiles({ items_ids: [3] }))?.[0]);
        setIsLoaded(true);
      }
    })();
  }, [isLoaded, profileId]);
  
  if (!profileId || isNaN(profileId)) {
    return <></>;
  }

  return <></>;
};

const styles = StyleSheet.create({
  title: {
    fontWeight: 'bold',
    marginTop: Layout.space.base,
  },
});

export default ProfileItemSection;
