import { useState } from 'react';
import { Layout } from '@/constants/Layout';
import TextView from "../view/TextView";
import i18n from "@/translation/i18n";
import BoxView from "../view/BoxView";
import BackButton from "../button/BackButton";
import JamCategoriesField from "../field/JamCategoriesField";
import AddMediaField from "../field/AddMediaField";
import AddCollaboratorsField from "../field/AddCollaboratorsField";
import UserLocationField from "../field/UserLocationField";
import StatusField from "../field/StatusField";
import IndustryField from "../field/IndustryField";
import DividerView from "../view/DividerView";
import SpinnerView from '../view/SpinnerView';
import ScreenManager from '@/classes/ScreenManager';
import ButtonView from '../view/ButtonView';
import InputTextField from "../field/InputTextField";
import InputTextareaField from "../field/InputTextareaField";
import UserManager from '@/classes/UserManager';

const AddJamForm = () => {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [jamData, setJamData] = useState<any>({});
  const [profileId, setProfileId] = useState<number>(0);

  const submitForm = async () => {
    setTimeout(() => setIsProcessing(false), 3000);
  }  

  const updateField = (key: string, value: any) => {
    setJamData({...jamData, ...{ [key]: value }});
  };

  UserManager.getProfileId().then((id: number)  => {
    if (!profileId) setProfileId(id);
    setIsLoaded(true);
  });

  if (!isLoaded) return <SpinnerView />;

  return (    
    <BoxView align="flex-start" justify="flex-start" scroll={true} style={Layout.screenContent}>
      <BackButton
        title={i18n.t('Create a Jam')}
        onPress={() => ScreenManager.toggleModal({name: 'AddJamForm'})}
      />

      <TextView>{i18n.t('What kind of Jam is it?')}</TextView>
      <JamCategoriesField />

      <DividerView />
      <InputTextField
        placeholder={i18n.t('Title')}
        value={jamData?.title}
        onChangeText={(value: string) => updateField('title', value)}
      />
      <InputTextareaField
        placeholder={i18n.t('Description')}
        value={jamData?.caption}
        onChangeText={(value: string) => updateField('caption', value)}
      />



      <DividerView />
      <AddMediaField />
      <AddCollaboratorsField />

      <DividerView />

      <UserLocationField />
      <StatusField />
      <IndustryField />

      <DividerView />
      <ButtonView 
        label={i18n.t('Save')} 
        isProcessing={isProcessing} 
        onPress={() => {
          setIsProcessing(true);
          submitForm();
        }} 
      />

      <DividerView />
    </BoxView>
  );
};

export default AddJamForm;
