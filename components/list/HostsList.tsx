import { useState, useEffect, useCallback } from 'react';
import { View } from "react-native";
import { useRouter } from "expo-router";
import { Layout } from "@/constants/Layout";
import TextView from "../view/TextView";
import i18n from "@/translation/i18n";
import BoxView from "../view/BoxView";
import ListView from "../view/ListView";
import SpinnerView from "../view/SpinnerView";
import EntityManager from '@/manager/EntityManager';
import ProfileListItem from './list-item/ProfileListItem';
import SectionManager from '@/manager/SectionManager';

type Props = {
  jamId?: any;
};

const HostsList = ({ jamId }: Props) => {
  const router = useRouter();
  const [profiles, setProfiles] = useState<any>(null);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  const onItemPress = (row: any) => {
    SectionManager.push(router, 'public-profile', { profileId: row?.item?.id, title: row?.item?.title })
  };

  const getProfiles = async () => {
    let jamData: any = (await EntityManager.getJams([jamId]))?.[0];
    let jamHosts: any = await EntityManager.getProfiles([jamData.profile.id, ...jamData?.collaborators || []]);

    return jamHosts;  
  };

  const renderItem = useCallback((row: any) => {
    return (
      <ProfileListItem
        row={row}
        onListItemPress={(row: any) => onItemPress(row)}
      />
    );
  }, []);

  useEffect(() => {
    (async () => {
      setProfiles(await getProfiles());
      setIsLoaded(true);
    })();

  }, [isLoaded, jamId]);

  if (!isLoaded) return <SpinnerView />;

  return (
    <BoxView align="flex-start" justify="flex-start" style={Layout.screenContent}>
      <View style={Layout.borderedListContainer}>
        {profiles?.length > 0 &&
          <ListView
            data={profiles}
            renderItem={(row: any) => renderItem(row)}
          />
        }

        {!profiles?.length &&
          <TextView>{i18n.t('No hosts available for this Jam.')}</TextView>
        }
      </View>
    </BoxView>
  );
};

export default HostsList;
