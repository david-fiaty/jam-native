import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import Collapsible from 'react-native-collapsible';
import TextView from './TextView';
import { Layout } from '@/constants/Layout';
import i18n from '@/translation/i18n';

type Props = {
  label?: any,
  openedLabel?:any,
  content?: any,
};

const CollapsibleView = ({label, content, openedLabel}: Props) => {
  const [collapsed, setCollapsed] = useState(true);
  let buttonLabel = label;
  
  if (!collapsed && openedLabel) {
    buttonLabel = openedLabel;
  }

  return (
    <View>
      <TouchableOpacity onPress={() => setCollapsed((prev) => !prev)}>
        {buttonLabel}
      </TouchableOpacity>
      <Collapsible 
        collapsed={collapsed} 
        align="center"
      >
        <View style={styles.content}>
          {content}
        </View>
      </Collapsible>
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    marginTop: Layout.space.base,
    width: '100%',
  },
});

export default CollapsibleView;