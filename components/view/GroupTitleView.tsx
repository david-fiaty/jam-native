import { ReactNode } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Layout } from '@/constants/Layout';
import TextView from './TextView';

type Props = {
  label?: any;
};

const GroupTitleView = ({ label }: Props) => {
  return (
    <TextView style={[styles.container]} bold={true}>
      {label}
    </TextView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: Layout.space.base * 1.3,
  },
});

export default GroupTitleView;
