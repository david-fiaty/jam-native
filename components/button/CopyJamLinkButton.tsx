import { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import * as Clipboard from 'expo-clipboard';
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

  const [copiedText, setCopiedText] = useState('');

  const copyToClipboard = async () => {
    let text = 'hello world'; // Todo - Link to Jam item
    await Clipboard.setStringAsync(text);
    setCopiedText(text);
  };

  const getFromClipboard = async () => {
    return await Clipboard.getStringAsync();
  };

  return (       
    <TouchableOpacity onPress={copyToClipboard}>
      <BoxView direction="row" align="center" justify="flex-start" style={style}>
        <IconView name="copy" theme="tertiary" />
        <TextView>{buttonTitle}</TextView>
      </BoxView>
    </TouchableOpacity>
  );
};

export default CopyJamLinkButton;