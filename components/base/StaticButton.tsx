
import { ReactNode } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { GlobalStyles } from '@/constants/GlobalStyles';
import TextBlock from './TextBlock';

type Props = {
  label?: string,
  icon?: ReactNode,
  radius?: number,
  uppercase?: boolean,
  onPress?: () => void,
};

export function StaticButton({label, icon, radius, uppercase, onPress}: Props) {
  const containerStyle = {
    ...styles.container,
  };

  const labelStyle = {
    ...styles.label,
  };;

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={containerStyle}>
        {icon}<TextBlock style={labelStyle}>{label}</TextBlock>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 'auto',
    marginRight: 'auto',
    justifyContent: 'center',
    backgroundColor: 'red',
    padding: GlobalStyles.gap,
    gap: GlobalStyles.gap,
  },
  label: {
    textAlign: 'center',
    backgroundColor: 'yellow', 
  },
});
