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
import ProfileProjectsList from '../list/ProfileProjectsList';
import UserManager from '@/manager/UserManager';

const AddJamToProjectForm = () => {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [profileId, setProfileId] = useState<number>(0);
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
        setProfileId(await UserManager.getProfileId());
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
        <TextView>{i18n.t('Select a project from your profile projects')}</TextView>

        <ProfileProjectsList
          title={i18n.t("Your Projects")} 
          idArray={[14, 18, 19]}
          //idArray={formData?.profile_projects}
        />
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
