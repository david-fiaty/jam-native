import React, { useState, useEffect } from "react";
import { StyleSheet, View } from 'react-native';
import { useRouter } from "expo-router";
import { BaseProps } from '@/constants/Types';
import { Layout } from "@/constants/Layout";
import TextView from './TextView';
import EntityManager from "@/manager/EntityManager";
import BoxView from "./BoxView";
import ImageView from "./ImageView";
import MediaManager from "@/manager/MediaManager";
import TagView from "./TagView";
import i18n from "@/translation/i18n";
import DividerView from "./DividerView";
import StaticData from "@/constants/StaticData";
import ProfileJamsList from "../list/ProfileJamsList";
import SectorsTagsView from "./SectorsTagsView";
import ProfileHeaderView from "./ProfileHeaderView";
import SectionManager from "@/manager/SectionManager";

type Props = BaseProps & {
  profileId: any;
};

const profileImageSize: number = 100;

const ProfileItemView = ({ profileId }: Props) => {
  const router = useRouter();
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [profileItem, setProfileItem] = useState<any>(null);
  const [sectorsData, setSectorsData] = useState<any>([]);

  const renderProfileSectors = (sectorsIds?: any)  => {
    let data: any[] = [];

    sectorsData.map((item: any) => {
      if ((sectorsIds || []).includes(item.id)) {
        data.push(<TagView key={item.id}>{item.name}</TagView>);  
      }
      else if (item?.sub_sectors?.length > 0) {
        item.sub_sectors.map((subitem: any) => {
          data.push(<TagView key={subitem.id}>{subitem.name}</TagView>);  
        });
      }
    });

    return data;
  };

  useEffect(() => {
    (async () => {
      if (!isLoaded) {
        setSectorsData(await EntityManager.getSectors());
        setProfileItem((await EntityManager.getProfile(profileId)));
        setIsLoaded(true);
      }
    })();
  }, [isLoaded, profileId]);

  return (
    <BoxView 
      direction="column" 
      align="flex-start" 
      justify="flex-start" 
      scroll={true}
      style={styles.container}
    >
      <ProfileHeaderView profileItem={profileItem} />
      <DividerView theme="secondary" />

      <BoxView direction="row" align="center" justify="flex-start" style={styles.profileJams}>
        <ProfileJamsList 
          allButton={true}
          title={<TextView style={styles.sectionTitle}>{i18n.t('Jams')} ({profileItem?.number_of_jams || 0})</TextView>}
          idArray={profileItem?.profile_jams?.map((o: any) => o.id)} // Todo - API should send ids, not full objects
          onListItemPress={(row: any) => SectionManager.push(router, 'jam-item', { jamId: JSON.stringify([row?.item?.id]), title: row?.item?.title })}
        />   

      </BoxView>

      <TextView style={styles.sectionTitle}>{i18n.t('Country')}</TextView>
      <BoxView direction="row" align="center" justify="flex-start" style={styles.profileDescription}>
        <TextView>{profileItem?.scope_country_code ? profileItem.scope_country_code : i18n.t('Unavailable')}</TextView>
      </BoxView>

      <TextView style={styles.sectionTitle}>{i18n.t('Description')}</TextView>
      <BoxView direction="row" align="center" justify="flex-start" style={styles.profileDescription}>
        <TextView>{profileItem?.profile_description ? profileItem?.profile_description : i18n.t('Unavailable')}</TextView>
      </BoxView>

      <TextView style={styles.sectionTitle}>{i18n.t('Sectors')}</TextView>
      <BoxView direction="row" align="center" justify="flex-start" style={styles.profileSectors}>
        <SectorsTagsView idArray={profileItem?.sectors} />
      </BoxView>

    </BoxView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    paddingBottom: Layout.space.base*3,
  },
  sectionTitle: {
    fontWeight: 'bold',
    fontSize: 13,
    marginTop: Layout.space.base/1.5,
  },
  profileJams: {
    width: '100%',
  },
  profileSectors: {
    width: '100%',
    flexWrap: 'wrap',
  },
  profileDescription: {
    width: '100%',
  },
});

export default ProfileItemView;
