import { StyleSheet, TouchableOpacity } from 'react-native';
import { Layout } from '@/constants/Layout';
import IconView from './IconView';
import BoxView from './BoxView';
import TextView from './TextView';

type Props = {
  theme?: any;
  canEdit?: boolean;
  containerStyle?: any;
  children?: any;
  onDeleteButtonPress?: () => void;
};

const TagView = ({ theme, canEdit, containerStyle, children, onDeleteButtonPress }: Props) => {
  const tagStyle = {
    ...(theme ? Layout.theme[theme] : Layout.theme.secondary),
    ...(containerStyle || {}),
  };

  return (
    <BoxView direction="row" align="center" justify="between" style={[styles.container, tagStyle]}>
      <TextView style={styles.text}>
        {children}
      </TextView>

      {canEdit === true && (
        <TouchableOpacity onPress={onDeleteButtonPress}>
          <IconView name="delete" theme="secondary" size={12} />
        </TouchableOpacity>
      )}
    </BoxView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Layout.colors.secondary,
    borderRadius: Layout.radius.round,
    paddingVertical: Layout.space.base/2.5,
    paddingHorizontal: Layout.space.base/2,
    alignSelf: 'flex-start',
    maxWidth: '100%',
  },
  primary: Layout.theme.primary,
  secondary: Layout.theme.secondary,
  tertiary: Layout.theme.tertiary,
  white: Layout.theme.white,
  text: {
    fontSize: 12.5,
  },
});

export default TagView;
