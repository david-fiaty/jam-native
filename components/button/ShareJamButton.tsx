import React from "react"
import { TouchableOpacity, Share } from 'react-native';
import IconView from '../view/IconView';
import i18n from '@/translation/i18n';
import BoxView from '../view/BoxView';
import TextView from '../view/TextView';

type Props = {
  title?: string,
  style?: object,
};

const ShareJamButton = ({title, style}: Props) => {
  const buttonTitle = title ? i18n.t(title) : i18n.t('Share Jam');

  const onShare = async () => {
    try {
      const result = await Share.share({
        // Todo - Link content to jam
        message: 'React Native | A framework for building native apps using React',
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (       
    <TouchableOpacity onPress={onShare}>
      <BoxView direction="row" align="center" justify="flex-start" style={style}>
        <IconView name="user" theme="tertiary" />
        <TextView>{buttonTitle}</TextView>
      </BoxView>
    </TouchableOpacity>
  );
};

export default ShareJamButton;