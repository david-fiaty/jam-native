import { StyleSheet } from "react-native";
import { BaseProps } from "@/constants/Types";
import TextView from "../view/TextView";
import i18n from "@/translation/i18n";
import BoxView from "../view/BoxView";
import BackButton from "../button/BackButton";
import SquareOptionsField from "../field/SquareOptionsField";
import MediaPickerField from "../field/MediaPickerField";
import DropdownField from "../field/DropdownField";
import { JamCategoriesData } from "@/constants/Data";

const AddJamForm = ({ style, children }: BaseProps) => {
  return (
    <BoxView align="flex-start" justify="flex-start">
      <BackButton
        title={i18n.t("Add new Jam")}
        onPress={() => console.log("clicked")}
      />
      <TextView>{i18n.t('What kind of Jam is it?')}</TextView>
      <SquareOptionsField data={JamCategoriesData} />
      <MediaPickerField />
      
    </BoxView>
  );
};

const styles = StyleSheet.create({
  container: {
    //justifyContent
  },
});

export default AddJamForm;
