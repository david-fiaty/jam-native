import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setActiveScreen } from "@/redux/slices/ScreenSlice";
import { Layout } from '@/constants/Layout';
import TextView from "../view/TextView";
import i18n from "@/translation/i18n";
import BoxView from "../view/BoxView";
import BackButton from "../button/BackButton";
import JamCategoriesField from "../field/JamCategoriesField";
import AddMediaField from "../field/AddMediaField";
import AddCollaboratorsField from "../field/AddCollaboratorsField";
import AddCaptionField from "../field/AddCaptionField";
import UserLocationField from "../field/UserLocationField";
import StatusField from "../field/StatusField";
import IndustryField from "../field/IndustryField";
import PostButton from "../button/PostButton";
import DividerView from "../view/DividerView";
import SpinnerView from '../view/SpinnerView';

const AddJamForm = () => {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setTimeout(() => setIsLoaded(true), Layout.animation.duration);
  });

  if (!isLoaded) return <SpinnerView />;

  return (    
    <BoxView align="flex-start" justify="flex-start" scroll={true} style={Layout.screenContent}>
      <BackButton
        title={i18n.t('Add new Jam')}
        onPress={() => dispatch(setActiveScreen({
          name: 'ProfileForm',
        }))}
      />
      <TextView>{i18n.t('What kind of Jam is it?')}</TextView>
      <JamCategoriesField />

      <DividerView />
      <AddMediaField />
      <AddCollaboratorsField />

      <DividerView />
      <AddCaptionField />

      <UserLocationField />
      <StatusField />
      <IndustryField />
      <PostButton />

      <DividerView />
    </BoxView>
  );
};

export default AddJamForm;
