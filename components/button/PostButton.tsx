import { StyleSheet } from 'react-native';
import { Layout } from '@/constants/Layout';
import ButtonBase from '../base/ButtonBase';
import i18n from '@/translation/i18n';

type Props = {
  onPress?: () => void,
};

const PostButton = ({onPress}: Props) => {
  return (       
    <ButtonBase 
      title={i18n.t('Post')} 
      onPress={onPress} 
      containerStyle={styles.container}  
      titleStyle={styles.title}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    borderRadius: Layout.radius.round,
  },
  title: {
    textTransform: 'uppercase',
  },
});

export default PostButton;