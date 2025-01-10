import { useState, useEffect } from 'react';
import { View } from "react-native";
import { Layout } from "@/constants/Layout";
import TextView from "../view/TextView";
import BackButton from "../button/BackButton";
import i18n from "@/translation/i18n";
import BoxView from "../view/BoxView";
import ListView from "../view/ListView";
import SpinnerView from "../view/SpinnerView";
import ScreenManager from "@/manager/ScreenManager";
import EntityManager from '@/manager/EntityManager';
import ProfileListItem from './ListItem/ProfileListItem';

const JammersList = () => {
  const [profiles, setProfiles] = useState<any>(null);
  const [entity, setEntity] = useState<any>(null);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const entityId = ScreenManager.getScreenEntityId();

  useEffect(() => {
    (async () => {
      if (!entity) setEntity(await EntityManager.getJams({items_ids: [entityId]}));
      if (entity && !profiles) setProfiles(await EntityManager.getProfiles({items_ids: entity?.[0]?.jammers}));
      setIsLoaded(true);
    })();
  });

  if (!entity) return <SpinnerView />;

  return (
    <BoxView align="flex-start" justify="flex-start" style={Layout.screenContent}>
      <BackButton
        title={i18n.t('Jammers')}
        onPress={() => ScreenManager.toggleScreen('JammersList')}
      />
      
      <View style={Layout.borderedListContainer}>
        {profiles?.length > 0 &&
          <ListView
            data={profiles}
            renderItem={(row: any) => <ProfileListItem item={row.item} />}
          />
        }

        {isLoaded && !profiles?.length && 
          <TextView>{i18n.t('No jammers available for this Jam.')}</TextView>
        }
      </View>
    </BoxView>
  );
};

export default JammersList;
