import { useState, useEffect } from 'react';
import { StyleSheet } from "react-native";
import { Layout } from "@/constants/Layout";
import TextView from "../view/TextView";
import i18n from "@/translation/i18n";
import SpinnerView from "../view/SpinnerView";
import EntityManager from '@/manager/EntityManager';
import BoxView from '../view/BoxView';
import CommentManager from '@/manager/CommentManager';

type Props = {
  entityId: any;
  entityType: any;
};

const JamCommentsList = ({ entityId, entityType }: Props) => {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [entityData, setEntityData] = useState<any>(null);
  const [entityComments, setEntityComments] = useState<any>(null);

  useEffect(() => {
    (async () => {
      if (!isLoaded) {
        let entityData: any = (await EntityManager.getJams(entityId))?.[0];

        setEntityData(entityData);
        setEntityComments(await CommentManager.renderComments('jam', entityId, entityData?.comments));
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
      style={[Layout.screenContent, styles.container]}
    >
      {!entityData?.comments.length &&
        <TextView>{i18n.t('No comments available.')}</TextView>
      }

      {entityComments}
    </BoxView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingBottom: Layout.space.base * 4,
    width: '100%',
    height: '100%',
  },
});

export default JamCommentsList;
