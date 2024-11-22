import { useState } from "react";
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
import DataManager from "@/manager/DataManager";

const JammersList = () => {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [entity, setEntity] = useState<any>(null);
  
  const entityId = ScreenManager.getActiveScreen()?.entityId;

  const profilesData: any = [];
  
  DataManager.get('profiles').then((data: any) => {
      console.log(data);

    //setIsLoaded(true);
  });

  
  DataManager.find('jams', 'id', entityId).then((item: any) => {
    if (!entity) setEntity(item);
    console.log(entity?.jammers);

    setIsLoaded(true);
  });

  if (!isLoaded) return <SpinnerView />;

  const renderItem = (row: any) => (
    <TouchableOpacity onPress={() => console.log('clicked')}>
      <BoxView direction="row" align="center" justify="flex-start" style={Layout.listItem}>
        <IconView name="user" theme="tertiary" />
        <TextView>{row.item.name}</TextView>
      </BoxView>
    </TouchableOpacity>
  );

  return (
    <BoxView align="flex-start" justify="flex-start" style={Layout.screenContent}>
      <BackButton
        title={i18n.t('Jammers')}
        onPress={() => ScreenManager.toggleModal({
          name: 'JammersList',
        })}
      />
      
      <View style={Layout.borderedListContainer}>
        {profilesData?.length > 0 &&
          <ListView
            data={profilesData}
            renderItem={(row: any) => renderItem(row)}
          />
        }

        {!profilesData?.length && 
          <TextView>{i18n.t('There are no jammers available for this Jam.')}</TextView>
        }
      </View>
    </BoxView>
  );
};

export default JammersList;
