import { useState, useEffect } from 'react';
import { View, TouchableOpacity } from "react-native";
import { Layout } from "@/constants/Layout";
import TextView from "../view/TextView";
import BackButton from "../button/BackButton";
import i18n from "@/translation/i18n";
import BoxView from "../view/BoxView";
import IconView from "../view/IconView";
import ListView from "../view/ListView";
import SpinnerView from "../view/SpinnerView";
import ScreenManager from "@/manager/ScreenManager";
import EntityManager from '@/manager/EntityManager';
import ProfileListItem from './ListItem/ProfileListItem';

const HostsList = () => {
  const [profiles, setProfiles] = useState<any>(null);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const entityId = ScreenManager.getScreenEntityId();

  useEffect(() => {
    (async () => {
      if (!isLoaded) {
        let data: any = await EntityManager.getJams({items_ids: [entityId]});
        setProfiles(await EntityManager.getProfiles({items_ids: data?.[0]?.collaborators}));
        setIsLoaded(true);
      }
    })();
  }, [isLoaded, entityId]);

  if (!isLoaded) return <SpinnerView />;

  return (
    <BoxView align="flex-start" justify="flex-start" style={Layout.screenContent}>
      <BackButton
        title={i18n.t('Jam hosts')}
        onPress={() => ScreenManager.toggleScreen('HostsList')}
      />
      <View style={Layout.borderedListContainer}>
        {profiles?.length > 0 &&
          <ListView
            data={profiles}
            renderItem={(row: any) => <ProfileListItem item={row.item} />}
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
