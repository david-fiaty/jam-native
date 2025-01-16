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
import EntityManager from '@/manager/EntityManager';
import ButtonView from '../view/ButtonView';
import DividerView from '../view/DividerView';

const AddJamToProjectForm = () => {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [profileId, setProfileId] = useState<number>(0);
  const [selectedIds, setSelectedIds] = useState<any>([]);
  const activeScreen: any = ScreenManager.getActiveScreen();
  const entityId: number = activeScreen.params.entityId;

  const updateSelection = (row: any) => {
    let selectedProjectsIds = [...selectedIds];
    let index: number = selectedProjectsIds.findIndex((id: number) => id == row.item.id);

    if (index === -1) selectedProjectsIds.push(row.item.id);
    else delete selectedProjectsIds[index];

    setSelectedIds(selectedProjectsIds.filter(Boolean));
  };

  const submitForm = async () => {
    setIsProcessing(true);

    let requests: any = selectedIds.map((id: number) => EntityManager.addJamToProject(id, { 
      profile_id: profileId,
      items_ids: [entityId], 
    }));

    let results: any = await Promise.all(requests);


    /*
    let message: any = {
      title: i18n.t('Add Jam to project'),
      content: i18n.t('Jam successfully added to project.'),
    };

    if (result?.error) message.content = i18n.t(result.error);
    ScreenManager.showMessage(message);
    */

    setIsProcessing(false);
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

  console.log(selectedIds);

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
        <TextView>{i18n.t('Select items from your profile projects:')}</TextView>
        <DividerView theme="secondary" />

        <ProfileProjectsList
          idArray={[14, 18, 19]} // Todo - Remove test
          onListItemPress={(row: any) => updateSelection(row)}
          isAddable={true}
          //idArray={formData?.profile_projects}
        />

        <DividerView theme="secondary" />
        <ButtonView
          label={i18n.t('Submit')}
          isProcessing={isProcessing}
          onPress={submitForm}
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
