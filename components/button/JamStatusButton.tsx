import { TouchableOpacity } from 'react-native';
import IconView from '../view/IconView';
import i18n from '@/translation/i18n';
import BoxView from '../view/BoxView';
import TextView from '../view/TextView';

type Props = {
  title?: string,
  style?: object,
};

const JamStatusButton = ({title, style}: Props) => {
  const buttonTitle = title ? i18n.t(title) : i18n.t('Save Jam');

  return (       
    <TouchableOpacity onPress={() => {}}>
      <BoxView direction="row" align="center" justify="flex-start" style={style}>
        <IconView name="save" theme="tertiary" />
        <TextView>{buttonTitle}</TextView>
      </BoxView>
    </TouchableOpacity>
  );
};

export default JamStatusButton;