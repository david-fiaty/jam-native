import { useState, useEffect } from 'react';
import { StyleSheet, Text } from 'react-native';
import { Colors } from '@/constants/Colors';
import { Layout } from '@/constants/Layout';
import ScreenManager from '@/manager/ScreenManager';
import SpinnerView from '../view/SpinnerView';
import BackButton from '../button/BackButton';
import BoxView from '../view/BoxView';
import i18n from '@/translation/i18n';
import TextView from '../view/TextView';

const AddJamToProjectForm = () => {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const activeScreen: any = ScreenManager.getActiveScreen();
  const entityId: number = activeScreen.params.entityId;

  const submitForm = () => {
    // Todo - Implement submit form
    /*
    {
      "profile_id": 1,
      "items_ids": [3, 4]
    }
    */
  };

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
      align="flex-start"
      justify="flex-start"
      scroll={true}
      style={Layout.screenContent}
    >
      <BackButton
        title={i18n.t('Add Jam to project')}
        onPress={() => ScreenManager.toggleScreen('AddJamToProjectForm')}
      />
        <TextView>{i18n.t('Select projects from your profile')}</TextView>
    </BoxView>
  );
};

const styles = StyleSheet.create({
  content: {
    color: Colors.primary,
    fontSize: Layout.fontSize.base,
  },
});

export default AddJamToProjectForm;
