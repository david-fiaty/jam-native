import { TouchableOpacity } from 'react-native';
import IconView from '../view/IconView';
import i18n from '@/translation/i18n';
import BoxView from '../view/BoxView';
import TextView from '../view/TextView';

type Props = {
  title?: string,
};

const ShareButton = ({title}: Props) => {
  const buttonTitle = title ? i18n.t(title) : i18n.t('Share');

  return (       
    <TouchableOpacity onPress={() => {}}>
      <BoxView direction="row" align="center" justify="flex-start">
        <IconView name="user" size={22} theme="tertiary" />
        <TextView>{buttonTitle}</TextView>
      </BoxView>
    </TouchableOpacity>
  );
};

export default ShareButton;