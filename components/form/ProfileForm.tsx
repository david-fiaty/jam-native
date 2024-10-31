import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setActiveScreen } from "@/redux/slices/ScreenSlice";
import { Layout } from '@/constants/Layout';
import i18n from "@/translation/i18n";
import BoxView from "../view/BoxView";
import BackButton from "../button/BackButton";
import UserLocationField from "../field/UserLocationField";
import IndustryField from "../field/IndustryField";
import DividerView from "../view/DividerView";
import UserProfileImageField from '../field/UserProfileImageField';
import InputTextField from '../field/InputTextField';
import CreativeOrganizationField from '../field/CreativeOrganizationField';
import UserJamsList from '../list/UserJamsList';
import UserProjectsList from '../list/UserProjectsList';
import SpinnerView from '../view/SpinnerView';
import DataManager from '@/classes/DataManager';

const ProfileForm = () => {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  let userJamsData = {};
  let userProjectsData = {};

  useEffect(() => {
    (async () => {
      userJamsData = await DataManager.get('jams');
      userProjectsData = await DataManager.get('projects');

      setTimeout(() => setIsLoaded(true), Layout.animation.duration);
    })();
  });

  if (!isLoaded) return <SpinnerView />;

  return (
    <BoxView align="flex-start" justify="flex-start" scroll={true} style={Layout.screenContent}>
      <BackButton
        title={i18n.t('Your profile')}
        onPress={() => dispatch(setActiveScreen({
          name: 'ProfileForm',
        }))}
      />

      <UserProfileImageField />

      <DividerView />
      <InputTextField placeholder={i18n.t('Public name')} />
      <InputTextField placeholder={i18n.t('IG handle')} />
      <InputTextField placeholder={i18n.t('Email address')} />
      <InputTextField placeholder={i18n.t('Phone number')} />
      <UserLocationField />
      <IndustryField />
      <CreativeOrganizationField />

      <DividerView />
      <UserProjectsList data={userProjectsData}  />

      <DividerView />
      <UserJamsList />
    </BoxView>
  );
};

export default ProfileForm;