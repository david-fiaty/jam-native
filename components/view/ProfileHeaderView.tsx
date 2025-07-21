import React, { useState, useEffect } from "react";
import { StyleSheet, View } from 'react-native';
import { Layout } from '@/constants/Layout';
import TextView from './TextView';
import MediaManager from '@/manager/MediaManager';
import ImageView from './ImageView';
import BoxView from "./BoxView";
import TagView from "./TagView";
import EntityManager from "@/manager/EntityManager";
import IconView from "./IconView";
import UserManager from "@/manager/UserManager";

const profileImageSize: number = 100;

type Props = {
  profileItem?: any;
};

const ProfileHeaderView = ({ profileItem }: Props) => {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [sectorsData, setSectorsData] = useState<any>([]);

  const renderProfileSectors = (sectorsIds?: any) => {
    let data: any[] = [];

    (sectorsIds || []).map((subSectorId: any) => {
      sectorsData.map((sector: any) => {
        let subSector: any = sector.sub_sectors.find((o: any) => o.id == subSectorId);
        if (subSector) {
          data.push(<TagView key={subSector.id}>{subSector.name}</TagView>);  
        }
      });
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
      <BoxView direction="row" align="center" justify="center" style={styles.profileHeaderLeft}>
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
            theme="secondary" 
            size={26}
            padding={28}
          />
        )}
      </BoxView>

      <View style={styles.profileHeaderRight}>
        <TextView style={styles.profileTitle}>{UserManager.getProfileDisplayName(profileItem)}</TextView>
        <TextView style={styles.profileType}>
          {UserManager.getProfileTypeLabel(profileItem?.profile_type)}
        </TextView>
        {renderProfileSectors(profileItem?.sectors)?.[0]}
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
    height: '100%',
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
