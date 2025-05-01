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
  const [sectorsData, setSectorsData] = useState<any>([]);

  const renderProfileSectors = async (sectorsIds?: any[]) => {
    return (sectorsIds || []).map((id: any) => {
      return (
        <TagView key={id}>
          {id}
        </TagView>
      );
    });
  };

  const getProfileSectors = async () => {

    console.log(profileItem?.sectors);

    return [];


    let data: any[] = [];

    sectorsData.map((o: any) => {
      console.log(o.id)
      if ((profileItem?.sectors || []).includes(o.id)) {
        data.push(o);
      }
    });

    return data;
  };

  const getSelectedSectors = (sectorsIds?: any) => {
    let selectedIds: any[] = sectorsIds?.length ? sectorsIds : [];
    let result: any[] = [];

    for (const item of sectorsData) {
      if (selectedIds.includes(item.id)) {
        for (const subitem of item?.sub_sectors || []) {
          if (selectedIds.includes(subitem.id)) {
            result.push(subitem);
          }
        }
      }
    }

    return result;
  };

  useEffect(() => {
    (async () => {
      if (!isLoaded) {
        setSectorsData(await EntityManager.getSectors());
        setProfileItem((await EntityManager.getProfiles({ items_ids: [profileId] }))?.[0]);
        setIsLoaded(true);
      }
    })();
  }, [isLoaded, profileId]);

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
        {renderProfileSectors(profileItem?.sectors || [])}

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
