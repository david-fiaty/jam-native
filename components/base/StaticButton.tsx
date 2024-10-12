
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

  const labeStyle = {
    ...styles.label,
  };;

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.container}>
        {icon}<TextBlock style={styles.label}>{label}</TextBlock>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
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
