import { BaseProps } from "@/constants/Types";
import { useSelector } from 'react-redux';
import i18n from "@/translation/i18n";
import BoxView from "../view/BoxView";
import TextView from "../view/TextView";
import IconView from "../view/IconView";

type Props = BaseProps & {
  onPressEvent?: () => void;
};

const SectorsField = ({onPressEvent}: Props) => {
  const jamData = useSelector((state: any) => state.addJam);
  const selectedProfiles = jamData?.collaborators_ids || [];

  return (
    <BoxView
      direction="row"
      align="center"
      onPress={onPressEvent}
    >
      <IconView name="plus" theme="secondary" radius="round" />
      <TextView>{i18n.t('Add industries')}</TextView>
    </BoxView>
  );
};

export default SectorsField;
