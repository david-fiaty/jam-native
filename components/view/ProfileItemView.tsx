import { useState, useEffect } from "react";
import { StyleSheet } from 'react-native';
import { BaseProps } from '@/constants/Types';
import TextView from './TextView';
import EntityManager from "@/manager/EntityManager";

type Props = BaseProps & {
  profileId: any;
};

const ProfileItemView = ({ profileId }: Props) => {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [profileItem, setProfileItem] = useState<any>(null);

  useEffect(() => {
    (async () => {
      if (!isLoaded) {
        setProfileItem((await EntityManager.getProfiles({ items_ids: [profileId] }))?.[0]);
        setIsLoaded(true);
      }  
    })();
  }, [isLoaded, profileId]);

  
  console.log(profileItem)

  return (
    <TextView>{profileId}</TextView>
  );
};

const styles = StyleSheet.create({
  container: {
  },
});

export default ProfileItemView;
