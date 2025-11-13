import { useState, useEffect } from 'react';
import { useSelector } from "react-redux";
import { Layout } from '@/constants/Layout';
import ScreenManager from '@/manager/ScreenManager';
import BoxView from '../view/BoxView';
import i18n from '@/translation/i18n';
import TextView from '../view/TextView';
import EntityManager from '@/manager/EntityManager';
import ButtonView from '../view/ButtonView';
import DividerView from '../view/DividerView';
import ProfileProjectsField from '../field/ProfileProjectsField';
import MediaManager from '@/manager/MediaManager';
import ImageView from '../view/ImageView';

type Props = {
  jamId: any;
};

const AddJamToProjectForm = ({ jamId }: Props) => {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [jamData, setJamData] = useState<any>({});
  const [selectedIds, setSelectedIds] = useState<any[]>([]);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const userState: any = useSelector((state: any) => state.user);
  const profileData: any = userState.profileData;
  const imageSize: any = MediaManager.getThumbnailSize();

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

  const renderJamItem = (row?: any) => {
    return (
      <ImageView
        uri={MediaManager.getImageUrl(row?.medias?.[0]?.url)}
        width={imageSize.width}
        height={imageSize.height}
        resizeMode="cover"
      />
    );
  };

  useEffect(() => {
    (async () => {
      if (!isLoaded) {
        setJamData(await EntityManager.getJam(jamId));
        setIsLoaded(true);
      }
    })();
  }, [isLoaded, jamId]);

  return (
    <BoxView
      align="flex-start"
      justify="flex-start"
      scroll={true}
      style={Layout.formContainer}
    >
      <BoxView
        align="flex-start"
        justify="flex-start"
      >
        <TextView>{i18n.t('Selected item')}</TextView>
        {renderJamItem(jamData)}
      </BoxView>

      <DividerView />

      <BoxView
        align="flex-start"
        justify="flex-start"
      >
        <TextView>{i18n.t('Select a project from your profile')}*</TextView>
        <ProfileProjectsField
          idArray={profileData?.profile_projects || []}
          emptyMessage={i18n.t('No data available.')}
          isPublic={false}
          onItemPress={toggleItemSelection}
          addable={false}
          selectable={true}
        />
      </BoxView>

      <DividerView />

      <ButtonView
        label={i18n.t('Submit')}
        isProcessing={isProcessing}
        onPress={submitForm}
        disabled={!selectedIds?.length}
      />
    </BoxView>
  );
};

export default AddJamToProjectForm;
