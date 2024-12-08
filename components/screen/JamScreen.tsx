import { useState, useEffect } from 'react';
import { useRouter } from 'expo-router';
import { Layout } from '@/constants/Layout';
import { BaseProps } from '@/constants/Types';
import BoxView from "../view/BoxView";
import BackButton from "../button/BackButton";
import SpinnerView from '../view/SpinnerView';
import TextView from '../view/TextView';
import i18n from '@/translation/i18n';
import EntityManager from '@/manager/EntityManager';

type Props = BaseProps & {
  entityId?: any,
};

const JamScreen = ({entityId}: Props) => {
  const router = useRouter();
  const [isLoaded, setIsLoaded] = useState(false);
  const [entity, setEntity] = useState<any>(null);

  if (!entity) { 
    EntityManager.getJams({items_ids: [entityId]}).then((item: any) => {
      setEntity(item[0]);
      setIsLoaded(true)
    });
  }

  useEffect(() => {
    setTimeout(() => setIsLoaded(true), Layout.animation.duration);
  });

  if (!isLoaded) return <SpinnerView />;

  return (
    <BoxView align="flex-start" justify="flex-start" scroll={true} style={Layout.screenContent}>
      <BackButton
        title={i18n.t('Saved Jam')}
        onPress={() => router.back()}
      />
    
      <TextView>{entity?.id}</TextView>

    </BoxView>
  );
};

export default JamScreen;