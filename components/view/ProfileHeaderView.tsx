import React, { useState, useEffect } from "react";
import { StyleSheet, View } from 'react-native';
import { useRouter } from 'expo-router';
import { BaseProps } from '@/constants/Types';
import { Layout } from '@/constants/Layout';
import TextView from './TextView';
import MediaManager from '@/manager/MediaManager';
import ImageView from './ImageView';
import BoxView from "./BoxView";
import StaticData from '@/constants/StaticData';
import TagView from "./TagView";
import EntityManager from "@/manager/EntityManager";

const profileImageSize: number = 100;

type Props = BaseProps & {
  profileItem?: any;
};

const ProfileHeaderView = ({ profileItem }: Props) => {
  const router = useRouter();
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
        <ImageView
          uri={MediaManager.getImageUrl('/media/files/609b6904-41df-4fb4-9b14-e75d8697f444.jpg')}
          //uri={MediaManager.getImageUrl(profileItem?.profile_picture?.url)} // Todo - Enable this
          resizeMode="cover"
          width={profileImageSize}
          height={profileImageSize}
          style={styles.profileImage}
        />
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
