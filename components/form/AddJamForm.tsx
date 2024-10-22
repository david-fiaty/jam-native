import { StyleSheet } from "react-native";
import { BaseProps } from "@/constants/Types";
import { JamCategoriesData } from "@/constants/Data";
import i18n from "@/translation/i18n";
import BackButton from "../button/BackButton";
import SquareOptionsField from "../field/SquareOptionsField";
import MediaPickerField from "../field/MediaPickerField";
import DropdownField from "../field/DropdownField";
import TextView from '../view/TextView';
import IconView from '../view/IconView';
import BoxView from '../view/BoxView';

const AddJamForm = ({ style, children }: BaseProps) => {
  return (
    <BoxView align="flex-start" justify="flex-start">
      <BackButton
        title={i18n.t("Add new Jam")}
        onPress={() => console.log("clicked")}
      />
      <TextView>{i18n.t('What kind of Jam is it?')}</TextView>
      <SquareOptionsField data={JamCategoriesData} />
      <MediaPickerField label={
        <BoxView direction="row" align="center" style={styles.container}>
          <IconView name="plus" theme="secondary" size={22} />
          <TextView>Add media</TextView> 
        </BoxView>      
      } />
      <DropdownField />
    </BoxView>
  );
};

const styles = StyleSheet.create({
  container: {
    //justifyContent
  },
});

export default AddJamForm;
