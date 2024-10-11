import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, } from 'react-native';
import Collapsible from 'react-native-collapsible';

const AccordionView = () => {
  const [collapsed, setCollapsed] = useState(true);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => setCollapsed((prev) => !prev)}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Single Collapsible</Text>
        </View>
      </TouchableOpacity>
      <Collapsible collapsed={collapsed} align="center">
        <View style={styles.content}>
          <Text>
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
    backgroundColor: 'gray',
    marginTop: 100,
    width: '100%',
  },
  header: {
    backgroundColor: 'orange',
    padding: 10,
  },
  headerText: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '500',
  },
  content: {
    padding: 20,
    backgroundColor: 'blue',
  },
});

export default AccordionView;