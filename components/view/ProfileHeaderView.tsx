import React, { useState, useEffect } from "react";
import { StyleSheet, View } from 'react-native';
import { Layout } from '@/constants/Layout';
import TextView from './TextView';
import MediaManager from '@/manager/MediaManager';
import ImageView from './ImageView';
import BoxView from "./BoxView";
import StaticData from '@/constants/StaticData';
import TagView from "./TagView";
import EntityManager from "@/manager/EntityManager";
import IconView from "./IconView";

const profileImageSize: number = 100;

type Props = {
  profileItem?: any;
};

const ProfileHeaderView = ({ profileItem }: Props) => {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [sectorsData, setSectorsData] = useState<any>([]);

  const renderProfileSectors = (sectorsIds?: any) => {
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
        setIsLoaded(true);
      }
    })();
  }, [isLoaded]);

  return (
    <BoxView direction="row" align="flex-start" justify="flex-start" style={styles.profileHeader}>
      <View style={styles.profileHeaderLeft}>
        {profileItem?.profile_picture?.url?.length > 0 && (
          <ImageView
            uri={MediaManager.getImageUrl(profileItem.profile_picture.url)}
            resizeMode="cover"
            width={profileImageSize}
            height={profileImageSize}
            style={styles.profileImage}
          />
        )}

        {!profileItem?.profile_picture?.url?.length && (
          <IconView 
            name="user" 
            theme="tertiary" 
            size={16}
            padding={6}
          />
        )}
      </View>

      <View style={styles.profileHeaderRight}>
        <TextView style={styles.profileTitle}>{profileItem?.profile_name}</TextView>
        <TextView style={styles.profileType}>
          {(StaticData.profileTypes.find((o: any) => o.id === profileItem?.profile_type))?.label}
        </TextView>
        {renderProfileSectors(profileItem?.sectors)[0]}
      </View>
    </BoxView>
  );
};

const styles = StyleSheet.create({
  profileHeader: {
    width: '100%',
    gap: 0,
    marginVertical: Layout.space.base / 1.5,
  },
  profileHeaderLeft: {
    width: profileImageSize,
  },
  profileHeaderRight: {
    paddingHorizontal: Layout.space.base * 1,
    paddingTop: Layout.space.base * 1.2,
    flex: 1,
    height: '100%',
  },
  profileImage: {
    width: profileImageSize,
    height: profileImageSize,
    borderRadius: profileImageSize,
  },
  profileTitle: {
    fontWeight: 'bold',
    fontSize: 15,
  },
  profileType: {
    fontSize: 13,
    paddingTop: 2,
    paddingBottom: 4,
  },
});

export default ProfileHeaderView;
