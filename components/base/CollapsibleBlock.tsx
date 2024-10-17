import { GlobalStyles } from '@/constants/GlobalStyles';
import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import Collapsible from 'react-native-collapsible';
import TextBlock from '@/components/base/TextBlock';

const CollapsibleBlock = () => {
  const [collapsed, setCollapsed] = useState(true);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => setCollapsed((prev) => !prev)}>
        <View style={styles.header}>
          <TextBlock>View more.</TextBlock>
        </View>
      </TouchableOpacity>
      <Collapsible collapsed={collapsed} align="center">
        <View style={styles.content}>
        <TextBlock>Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. sit amet, consectetur adipiscing elit </TextBlock>
        </View>
      </Collapsible>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    marginTop: GlobalStyles.space.base,
  },
  header: {
  },
  headerText: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '500',
  },
  content: {
    paddingTop: GlobalStyles.space.base/2,
  },
});

export default CollapsibleBlock;