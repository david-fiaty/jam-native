import { useState, useEffect } from 'react';
import { useSelector } from "react-redux";
import { Layout } from '@/constants/Layout';
import ScreenManager from '@/manager/ScreenManager';
import SpinnerView from '../view/SpinnerView';
import BoxView from '../view/BoxView';
import i18n from '@/translation/i18n';
import TextView from '../view/TextView';
import EntityManager from '@/manager/EntityManager';
import ButtonView from '../view/ButtonView';
import DividerView from '../view/DividerView';
import ModalManager from '@/manager/ModalManager';
import ProfileProjectsField from '../field/ProfileProjectsField';

type Props = {
  jamId: any;
};

const AddJamToProjectForm = ( { jamId }: Props ) => {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [profileData, setProfileData] = useState<any>({});
  const [selectedIds, setSelectedIds] = useState<any[]>([]);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const userState: any = useSelector((state: any) => state.user);

  const submitForm = async () => {
    setIsProcessing(true);
    let result: any = await EntityManager.addJamToProject(selectedIds[0], {
      profile_id: profileData?.id,
      items_ids: [jamId],
    });

    let message: any = {
      title: i18n.t('Add Jam to project'),
      content: i18n.t('Jam successfully added to your project.'),
    };

    if (result?.error) message.content = i18n.t(result.error);
    ScreenManager.showMessage(message);

    setIsProcessing(false);
  };

  const toggleItemSelection = (idArray: any) => {
    setSelectedIds(idArray);
  };

  useEffect(() => {
    if (!isLoaded) {
      setProfileData(userState.profileData);
      setIsLoaded(true);
    }
  }, [isLoaded, userState]);

  if (!isLoaded) return <SpinnerView />;

  return (
    <BoxView
      align="flex-start"
      justify="flex-start"
      scroll={true}
      style={Layout.formContainer}
    >
      <DividerView />
      
      <TextView>{i18n.t('Select a project from your profile')}:</TextView>
      
      <DividerView />
      
      <ProfileProjectsField
        idArray={profileData?.profile_projects || []}
        emptyMessage={i18n.t('No data available.')}
        isPublic={false}
        onItemPress={toggleItemSelection}
        addable={false}
        selectable={true}
      />

      <DividerView />

      <ButtonView
        label={i18n.t('Submit')}
        isProcessing={isProcessing}
        onPress={submitForm}
      />
    </BoxView>
  );
};

export default AddJamToProjectForm;
