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
  commentsData?: any;
};

const CommentsList = ({ entityId, entityType, commentsData }: Props) => {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      if (!isLoaded) {
        setIsLoaded(true);
      }
    })();

  }, [isLoaded]);

  if (!isLoaded) return <SpinnerView />;

  return (
    <BoxView
      direction="column"
      align="center"
      justify="flex-start"
      style={Layout.screenContent}
    >
      <TextView>Comments view</TextView>
      <TextView>{entityId}</TextView>
      <TextView>{entityType}</TextView>
    </BoxView>
  );
};

export default CommentsList;
