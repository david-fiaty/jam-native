import { useState } from 'react';
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

const JammersList = () => {
  const [profiles, setProfiles] = useState<any>(null);
  const [entity, setEntity] = useState<any>(null);
  const entityId = ScreenManager.getActiveScreen()?.entityId;

  if (!entity) {
    EntityManager.find('jams', entityId).then((item: any) => {
      setEntity(item);
    });
  }

  if (!profiles) {
    EntityManager.getProfiles().then((items: any) => {
      setProfiles(items);
    });
  }

  if (!entity || !profiles) return <SpinnerView />;

  const renderItem = (row: any) => (
    <TouchableOpacity onPress={() => console.log('clicked')}>
      <BoxView direction="row" align="center" justify="flex-start" style={Layout.listItem}>
        <IconView name="user" theme="tertiary" />
        <TextView>{row.item.profile_name}</TextView>
      </BoxView>
    </TouchableOpacity>
  );

  return (
    <BoxView align="flex-start" justify="flex-start" style={Layout.screenContent}>
      <BackButton
        title={i18n.t('Jammers')}
        onPress={() => ScreenManager.toggleModal({ name: 'JammersList' })}
      />
      
      <View style={Layout.borderedListContainer}>
        {profiles?.length > 0 &&
          <ListView
            data={profiles}
            renderItem={(row: any) => renderItem(row)}
          />
        }

        {!profiles?.length && 
          <TextView>{i18n.t('There are no jammers available for this Jam.')}</TextView>
        }
      </View>
    </BoxView>
  );
};

export default JammersList;
