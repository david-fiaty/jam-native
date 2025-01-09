import { BaseProps } from "@/constants/Types";
import i18n from "@/translation/i18n";
import BoxView from "../view/BoxView";
import TextView from "../view/TextView";
import IconView from "../view/IconView";

type Props = BaseProps & {
  selectedIds?: any;
  onPressEvent?: () => void;
};

const CollaboratorsField = ({ selectedIds, onPressEvent }: Props) => {


  console.log('selectedIds', selectedIds);

  return (
    <BoxView
      direction="row"
      align="center"
      onPress={onPressEvent}
    >
      <IconView name="plus" theme="secondary" radius="round" />
      <TextView>{i18n.t('Add collaborators')}</TextView>
    </BoxView>
  );
};

export default CollaboratorsField;
