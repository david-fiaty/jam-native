import { StyleSheet, TouchableOpacity } from 'react-native';
import IconView from '../view/IconView';
import TextView from '../view/TextView';
import { Layout } from '@/constants/Layout';
import BoxView from '../view/BoxView';
import ButtonBase from '../base/ButtonBase';
import i18n from '@/translation/i18n';

type Props = {
  onPress?: () => void,
};

const PostButton = ({onPress}: Props) => {
  return (       
    <BoxView style={styles.container}>
    <ButtonBase label={i18n.t('Post')} onPress={onPress} />
    </BoxView> 
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    //alignItems: 'center',
    //flexDirection: 'row',
    //gap: Layout.space.base,
  },
});

export default PostButton;