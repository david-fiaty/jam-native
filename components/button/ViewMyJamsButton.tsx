import { TouchableOpacity } from 'react-native';
import IconView from '../view/IconView';
import i18n from '@/translation/i18n';
import BoxView from '../view/BoxView';
import TextView from '../view/TextView';

type Props = {
  title?: string,
};

const ViewMyJams = ({title}: Props) => {
  const buttonTitle = title ? i18n.t(title) : i18n.t('View my jams');

  return (       
    <TouchableOpacity onPress={() => {}}>
      <BoxView direction="row" align="center" justify="flex-start">
        <IconView name="view" size={22} theme="tertiary" />
        <TextView>{buttonTitle}</TextView>
      </BoxView>
    </TouchableOpacity>
  );
};

export default ViewMyJams;