import { Layout } from "@/constants/Layout";
import { StyleSheet } from "react-native";
import BoxView from "../view/BoxView";
import TextView from "../view/TextView";

type Props = {

};

const SearchFiltersForm = ({ }: Props) => {
  return (
    <BoxView
      align="flex-start"
      justify="flex-start"
      scroll={true}
      style={[Layout.formContainer, styles.container]}
    >
      <BoxView direction="column" style={[Layout.formContainer, styles.formContainer]}>
        <TextView>SEARCH FILTERS FORM</TextView>
      </BoxView>
    </BoxView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
  },
  formContainer: {
    maxWidth: '100%',
    flexShrink: 1,
    paddingTop: Layout.space.base,
  },
});
export default SearchFiltersForm;
