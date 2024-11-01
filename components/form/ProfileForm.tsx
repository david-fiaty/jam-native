import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
import InputTextareaField from '../field/InputTextareaField';

const ProfileForm = () => {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const [userJamsData, setUserJamsData] = useState([]);
  const [userProjectsData, setUserProjectsData] = useState([]);
  const userState = useSelector((state: any) => state.user);

  const accountData = JSON.parse(userState.accountData);

  useEffect(() => {
    (async () => {
      let userJamsData = await DataManager.get('jams');
      let userProjectsData = await DataManager.get('projects');

      setTimeout(() => {
        setUserJamsData(userJamsData);
        setUserProjectsData(userProjectsData);
        setIsLoaded(true);
      }, Layout.animation.duration);
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

      <InputTextField 
        placeholder={i18n.t('Email address')} 
        value={accountData?.email}  
        onChangeText={(text: string) => {}}
      />
      <InputTextField 
        placeholder={i18n.t('User name')} 
        value={accountData?.username}  
        onChangeText={(text: string) => {}}
      />
      <InputTextField 
        placeholder={i18n.t('Phone number')} 
        value={accountData?.phone}  
        onChangeText={(text: string) => {}}
      />
      <InputTextareaField
        placeholder={i18n.t('Description')} 
        value={accountData?.profiles[0].description}  
        onChangeText={(text: string) => {}}
      />
      
      <UserLocationField />

      <IndustryField />
      
      <CreativeOrganizationField />

      <DividerView />
      <UserProjectsList data={userProjectsData}  />

      <DividerView />
      <UserJamsList data={userJamsData} />
    </BoxView>
  );
};

export default ProfileForm;