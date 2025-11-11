import { useState, useEffect } from 'react';
import { Layout } from '@/constants/Layout';
import ScreenManager from '@/manager/ScreenManager';
import SpinnerView from '../view/SpinnerView';
//import BackButton from '../button/BackButton';
import BoxView from '../view/BoxView';
import i18n from '@/translation/i18n';
import TextView from '../view/TextView';
//import ProfileProjectsList from '../list/ProfileProjectsList';
import UserManager from '@/manager/UserManager';
import EntityManager from '@/manager/EntityManager';
import ButtonView from '../view/ButtonView';
import DividerView from '../view/DividerView';
import ModalManager from '@/manager/ModalManager';

const AddJamToProjectForm = () => {

  // Todo - Implement component
  return <TextView>Add jam to project form</TextView>;
  
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [profileId, setProfileId] = useState<number>(0);
  const [selectedIds, setSelectedIds] = useState<any>([]);
  const [profileData, setProfileData] = useState<any>({});
  const activeModal: any = ScreenManager.getActiveModal();
  const entityId: number = activeModal.params.entityId;

  const updateSelection = (row: any) => {
    setSelectedIds([row.item.id]);
  };

  const submitForm = async () => {
    setIsProcessing(true);
    let result: any = await EntityManager.addJamToProject(selectedIds[0], { 
      profile_id: profileId,
      items_ids: [entityId], 
    });

    let message: any = {
      title: i18n.t('Add Jam to project'),
      content: i18n.t('Jam successfully added to your project.'),
    };

    if (result?.error) message.content = i18n.t(result.error);
    ScreenManager.showMessage(message);

    setIsProcessing(false);
  };

  useEffect(() => {
    (async () => {
      if (!isLoaded) {
        setProfileId(await UserManager.getProfileId());
        setProfileData(await UserManager.getProfileData());
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
        onPress={() => ModalManager.toggleModal('AddJamToProjectForm')}
      />
        <TextView>{i18n.t('Select a project from your profile:')}</TextView>
        <DividerView theme="secondary" />

        <ProfileProjectsList
          onListItemPress={(row: any) => updateSelection(row)}
          isAddable={true}
          multiSelect={false}
          //idArray={[14, 18, 19]} // Todo - Remove test
          idArray={profileData?.profile_projects}
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

export default AddJamToProjectForm;
