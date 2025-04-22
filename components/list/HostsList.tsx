import { useState, useEffect } from 'react';
import { View } from "react-native";
import { Layout } from "@/constants/Layout";
import TextView from "../view/TextView";
import i18n from "@/translation/i18n";
import BoxView from "../view/BoxView";
import ListView from "../view/ListView";
import SpinnerView from "../view/SpinnerView";
import EntityManager from '@/manager/EntityManager';
import ProfileListItem from './ListItem/ProfileListItem';
import ScreenManager from '@/manager/ScreenManager';

type Props = {
  jamId?: any;
};

const HostsList = ({ jamId }: Props) => {  
  const [profiles, setProfiles] = useState<any>(null);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      let data: any = await EntityManager.getJams({items_ids: [jamId]});
      setProfiles(await EntityManager.getProfiles({items_ids: data?.[0]?.collaborators}));
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
