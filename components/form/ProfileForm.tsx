import { StyleSheet, View } from 'react-native';
import { BaseProps } from '@/constants/Types';
import i18n from "@/translation/i18n";
import BoxView from "../view/BoxView";
import BackButton from "../button/BackButton";
import AddMediaField from "../field/AddMediaField";
import AddCollaboratorsField from "../field/AddCollaboratorsField";
import AddCaptionField from "../field/AddCaptionField";
import UserLocationField from "../field/UserLocationField";
import StatusField from "../field/StatusField";
import IndustryField from "../field/IndustryField";
import PostButton from "../button/PostButton";
import DividerView from "../view/DividerView";
import UserProfileImageField from '../field/UserProfileImageField';
import InputTextBase from '../base/InputTextBase';

const ProfileForm = ({style, children}: BaseProps) => {

  return (
    <BoxView align="flex-start" justify="flex-start" scroll={true}>
      <BackButton
        title={i18n.t('Add new Jam')}
        onPress={() => console.log('clicked')}
      />

      <UserProfileImageField />

      <DividerView />
      <InputTextBase placeholder={i18n.t('Public name')} />
      <InputTextBase placeholder={i18n.t('IG handle')} />
      <InputTextBase placeholder={i18n.t('Email address')} />
      <InputTextBase placeholder={i18n.t('Phone number')} />
      <UserLocationField />
      <IndustryField />
      <StatusField />
      <PostButton />
    </BoxView>
  );
};

const styles = StyleSheet.create({
  container: {
  },
});

export default ProfileForm;