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
  entityId: any;
  entityType: any;
};

const JamCommentsList = ({ entityId, entityType }: Props) => {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [entityData, setEntityData] = useState<any[]>([]);

  const renderItem = (row: any) => {
    return (
      <View key={row.item.id}>
        <TextView>{row.item.comment_text}</TextView>
        <TextView>--------</TextView>
      </View>
    );
  };

  useEffect(() => {
    (async () => {
      if (!isLoaded) {
        setEntityData((await EntityManager.getJams(entityId))?.[0]);
        setIsLoaded(true);
      }
    })();
  }, [isLoaded, entityId]);

  if (!isLoaded) return <SpinnerView />;

  return (
    <BoxView
      direction="column"
      align="flex-start"
      justify="flex-start"
      style={Layout.screenContent}
    >
      {entityData?.comments?.length > 0 &&
        <ListView
          data={entityData?.comments}
          renderItem={(row: any) => renderItem(row)}
        />
      }

      {!entityData?.comments?.length &&
        <TextView>{i18n.t('No comments available.')}</TextView>
      }
    </BoxView>
  );
};

export default JamCommentsList;
