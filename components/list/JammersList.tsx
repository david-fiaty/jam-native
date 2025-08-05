import { useState, useEffect, useCallback } from 'react';
import { View } from "react-native";
import { useRouter } from "expo-router";
import { Layout } from "@/constants/Layout";
import TextView from "../view/TextView";
import i18n from "@/translation/i18n";
import ListView from "../view/ListView";
import SpinnerView from "../view/SpinnerView";
import EntityManager from '@/manager/EntityManager';
import ProfileListItem from './list-item/ProfileListItem';
import SectionManager from '@/manager/SectionManager';
import BoxView from '../view/BoxView';

type Props = {
  jamId?: any;
  jammersIds?: any;
};

const JammersList = ({ jamId, jammersIds }: Props) => {
  const router = useRouter();
  const [profiles, setProfiles] = useState<any>(null);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  const onItemPress = (row: any) => {
    SectionManager.push(router, 'profile', { profileId: row?.item?.id, title: row?.item?.title });
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
      setProfiles(await EntityManager.getProfiles(jammersIds));
      setIsLoaded(true);
    })();

  }, [isLoaded, jamId, jammersIds]);

  if (!isLoaded) return <SpinnerView />;

  return (
    <BoxView
      direction="column"
      align="center"
      justify="flex-start"
      style={Layout.screenContent}
    >
      <View style={Layout.borderedListContainer}>
        {profiles?.length > 0 &&
          <ListView
            data={profiles}
            renderItem={(row: any) => renderItem(row)}
          />
        }

        {!profiles?.length &&
          <TextView>{i18n.t('No jammers available for this Jam.')}</TextView>
        }
      </View>
    </BoxView>
  );
};

export default JammersList;
