import { StyleSheet, View } from 'react-native';
import { BaseProps } from '@/constants/Types';
import TextView from '../view/TextView';
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

const ProfileForm = ({style, children}: BaseProps) => {

  return (
    <BoxView align="flex-start" justify="flex-start" scroll={true}>
      <BackButton
        title={i18n.t('Add new Jam')}
        onPress={() => console.log('clicked')}
      />
      <TextView>{i18n.t('What kind of Jam is it?')}</TextView>

      <DividerView />
      <AddMediaField />
      <AddCollaboratorsField />

      <DividerView />
      <AddCaptionField />

      <DividerView />
      <UserLocationField />
      <StatusField />
      <IndustryField />
      <PostButton />
    </BoxView>
  );
};

const styles = StyleSheet.create({
  container: {
  },
});

export default ProfileForm;