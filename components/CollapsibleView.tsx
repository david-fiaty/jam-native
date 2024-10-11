import { GlobalStyles } from '@/constants/GlobalStyles';
import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Collapsible from 'react-native-collapsible';

const CollapsibleView = () => {
  const [collapsed, setCollapsed] = useState(true);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => setCollapsed((prev) => !prev)}>
        <View style={styles.header}>
          <Text style={GlobalStyles.text}>View more.</Text>
        </View>
      </TouchableOpacity>
      <Collapsible collapsed={collapsed} align="center">
        <View style={styles.content}>
          <Text style={GlobalStyles.text}>
            Bacon ipsum dolor amet chuck turducken landjaeger tongue spare
            ribs
          </Text>
        </View>
      </Collapsible>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    marginTop: GlobalStyles.gap,
  },
  header: {
  },
  headerText: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '500',
  },
  content: {
    paddingTop: GlobalStyles.gap/2,
  },
});

export default CollapsibleView;