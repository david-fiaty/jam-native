import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import Collapsible from 'react-native-collapsible';
import TextView from './TextView';
import { Layout } from '@/constants/Layout';

type Props = {
  label: string,
};

const CollapsibleView = ({label}: Props) => {
  const [collapsed, setCollapsed] = useState(true);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => setCollapsed((prev) => !prev)}>
        <View style={styles.header}>
          <TextView>{label}</TextView>
        </View>
      </TouchableOpacity>
      <Collapsible collapsed={collapsed} align="center">
        <View style={styles.content}>
          <TextView>Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. sit amet, consectetur adipiscing elit </TextView>
        </View>
      </Collapsible>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  header: {
    //paddingBottom: Layout.space.base,
  },
  headerText: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '500',
  },
  content: {
    marginTop: Layout.space.base,
  },
});

export default CollapsibleView;