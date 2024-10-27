import { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';
import IconView from '../view/IconView';
import i18n from '@/translation/i18n';
import BoxView from '../view/BoxView';
import TextView from '../view/TextView';

type Props = {
  title?: string,
  style?: object,
};

const CopyJamLinkButton = ({title, style}: Props) => {
  const buttonTitle = title ? i18n.t(title) : i18n.t('Copy link');

  const [clipboardText, setClipboardText] = useState('');

  const copyText = () => {
    Clipboard.setString('hello world');
  };

  const fetchText = async () => {
    const text = await Clipboard.getString();
    setClipboardText(text);
  };

  console.log(clipboardText);

  return (       
    <TouchableOpacity onPress={copyText}>
      <BoxView direction="row" align="center" justify="flex-start" style={style}>
        <IconView name="copy" theme="tertiary" />
        <TextView>{buttonTitle}</TextView>
      </BoxView>
    </TouchableOpacity>
  );
};

export default CopyJamLinkButton;