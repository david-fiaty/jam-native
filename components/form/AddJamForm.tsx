import { StyleSheet } from "react-native";
import { BaseProps } from "@/constants/Types";
import { JamCategoriesData } from "@/constants/Data";
import TextView from "../view/TextView";
import i18n from "@/translation/i18n";
import BoxView from "../view/BoxView";
import BackButton from "../button/BackButton";
import JamCategoriesField from "../field/JamCategoriesField";
import AddMediaField from "../field/AddMediaField";
import AddCollaboratorsField from "../field/AddCollaboratorsField";

const AddJamForm = ({ style, children }: BaseProps) => {
  return (
    <BoxView align="flex-start" justify="flex-start">
      <BackButton
        title={i18n.t('Add new Jam')}
        onPress={() => console.log('clicked')}
      />
      <TextView>{i18n.t('What kind of Jam is it?')}</TextView>
      <JamCategoriesField data={JamCategoriesData} />
      <AddMediaField />
      <AddCollaboratorsField />
    </BoxView>
  );
};

const styles = StyleSheet.create({
  container: {
    //justifyContent
  },
});

export default AddJamForm;
