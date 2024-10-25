import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setTabActive } from "@/redux/slices/TabSlice";
import { Layout } from '@/constants/Layout';
import i18n from "@/translation/i18n";
import BoxView from "../view/BoxView";
import BackButton from "../button/BackButton";
import UserLocationField from "../field/UserLocationField";
import IndustryField from "../field/IndustryField";
import DividerView from "../view/DividerView";
import UserProfileImageField from '../field/UserProfileImageField';
import InputTextBase from '../base/InputTextBase';
import CreativeOrganizationField from '../field/CreativeOrganizationField';
import UserJamsList from '../list/UserJamsList';
import UserProjectsList from '../list/UserProjectsList';
import SpinnerView from '../view/SpinnerView';

const AccountForm = () => {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setTimeout(() => setIsLoaded(true), Layout.animation.duration);
  });

  if (!isLoaded) return <SpinnerView />;

  return (
    <BoxView align="flex-start" justify="flex-start" scroll={true}>
      <BackButton
        title={i18n.t('Account information')}
        onPress={() => dispatch(setTabActive('AccountForm'))}
      />
      <BoxView direction="column" align="flex-start" justify="flex-start" style={Layout.pageContent}>
        <InputTextBase placeholder={i18n.t('Full name')} />
        <InputTextBase placeholder={i18n.t('Email address')} />
        <InputTextBase placeholder={i18n.t('Phone number')} />
      </BoxView>
    </BoxView>
  );
};

export default AccountForm;