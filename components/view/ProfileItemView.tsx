import { useState, useEffect } from "react";
import { StyleSheet } from 'react-native';
import { BaseProps } from '@/constants/Types';
import TextView from './TextView';
import EntityManager from "@/manager/EntityManager";
import BoxView from "./BoxView";
import ImageView from "./ImageView";
import MediaManager from "@/manager/MediaManager";

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
    <BoxView direction="column" align="flex-start" justify="flex-start" style={styles.container}>
      <TextView>{profileItem?.profile_type}</TextView>

      <>{profileItem?.profile_picture?.url}</>

      
      <ImageView
        uri={MediaManager.getImageUrl('/media/files/bb4669ed-8bb6-454b-a740-503ce42f935f.png')}
        //uri={MediaManager.getImageUrl(profileItem?.profile_picture?.url)} // Todo - Enable this
        resizeMode="cover"
        width={100}
        height={100}
      />
    </BoxView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'red',
    flex: 1,
    width: '100%',
  },
});

export default ProfileItemView;
