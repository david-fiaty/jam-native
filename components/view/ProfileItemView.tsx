import { useState, useEffect } from "react";
import { StyleSheet, View } from 'react-native';
import { BaseProps } from '@/constants/Types';
import TextView from './TextView';
import EntityManager from "@/manager/EntityManager";
import BoxView from "./BoxView";
import ImageView from "./ImageView";
import MediaManager from "@/manager/MediaManager";
import { Layout } from "@/constants/Layout";
import TagView from "./TagView";

type Props = BaseProps & {
  profileId: any;
};

const ProfileItemView = ({ profileId }: Props) => {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [profileItem, setProfileItem] = useState<any>(null);
  const [profileSectors, setProfileSectors] = useState<any>([]);

  const getProfileSectors = async () => {
    //setSectorsData(await EntityManager.getSectors());
    return ['yo'];
  };

  useEffect(() => {
    (async () => {
      if (!isLoaded) {
        setProfileSectors(await getProfileSectors());
        setProfileItem((await EntityManager.getProfiles({ items_ids: [profileId] }))?.[0]);
        setIsLoaded(true);
      }
    })();
  }, [isLoaded, profileId]);

  console.log(profileSectors);

  return (
    <BoxView direction="column" align="flex-start" justify="flex-start" style={styles.container}>
      <BoxView direction="row" align="flex-start" justify="flex-start" style={styles.profileHeader}>
        <View style={styles.profileHeaderLeft}>
          <ImageView
            uri={MediaManager.getImageUrl('/media/files/609b6904-41df-4fb4-9b14-e75d8697f444.jpg')}
            //uri={MediaManager.getImageUrl(profileItem?.profile_picture?.url)} // Todo - Enable this
            resizeMode="cover"
            width={100}
            height={100}
            style={styles.profileImage}
          />
        </View>

        <View style={styles.profileHeaderRight}>
          <TextView style={styles.profileTitle}>{profileItem?.profile_name}</TextView>
          <TextView>{profileItem?.profile_type}</TextView>
        </View>
      </BoxView>

      <BoxView direction="row" align="center" justify="flex-start" style={styles.profileSectors}>
        <TextView>{JSON.stringify(profileItem?.sectors || {})}</TextView>
        {profileItem?.sectors?.length > 0 && profileItem.sectors.map((id: any) => {
          <TagView key={id}>
            {id}
          </TagView>
        })}

      </BoxView>

      <BoxView direction="row" align="center" justify="flex-start" style={styles.profileDescription}>
        <TextView>{profileItem?.profile_description}</TextView>
      </BoxView>

      <TextView>{profileItem?.scope_country_code}</TextView>
    </BoxView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'red',
    flex: 1,
    width: '100%',
  },
  profileHeader: {
    width: '100%',
    backgroundColor: 'black',
    gap: 0,
  },
  profileHeaderLeft: {
    backgroundColor: 'yellow',
    width: 100,
  },
  profileHeaderRight: {
    backgroundColor: 'green',
    paddingHorizontal: Layout.space.base,
    flex: 1,
    height: '100%',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 100,
    alignSelf: 'flex-start',
  },
  profileTitle: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  profileSectors: {
    width: '100%',
  },
  profileDescription: {
    width: '100%',
  },
});

export default ProfileItemView;
