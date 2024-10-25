import { StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { setTabActive } from "@/redux/slices/TabSlice";
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

const ProfileForm = () => {
  const dispatch = useDispatch();

  return (
    <BoxView align="flex-start" justify="flex-start" scroll={true}>
      <BackButton
        title={i18n.t('Your profile')}
        onPress={() => dispatch(setTabActive('ProfileForm'))}
      />

      <UserProfileImageField />

      <DividerView />
      <InputTextBase placeholder={i18n.t('Public name')} />
      <InputTextBase placeholder={i18n.t('IG handle')} />
      <InputTextBase placeholder={i18n.t('Email address')} />
      <InputTextBase placeholder={i18n.t('Phone number')} />
      <UserLocationField />
      <IndustryField />
      <CreativeOrganizationField />

      <DividerView />
      <UserProjectsList />

      <DividerView />
      <UserJamsList />
    </BoxView>
  );
};

const styles = StyleSheet.create({
  container: {
  },
});

export default ProfileForm;