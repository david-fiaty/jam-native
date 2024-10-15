import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import SectionedMultiSelect from 'react-native-sectioned-multi-select';
import { MaterialIcons as Icon } from '@expo/vector-icons';
import { GlobalStyles } from '@/constants/GlobalStyles';

const items = [
  { name: 'Cars', id: 1},
  { name: 'Vans', id: 2},
  { name: 'SUVs', id: 3},
  { name: 'Motorbikes', id: 4 },
  { name: 'Trucks', id: 5},
];

const MultiselectDropdownField = () => {
  const [selectedItems, setSelectedItems] = useState([]);
  console.log('Selected:', selectedItems);

  return (
    <View style={styles.container}>
      <View>
        <SectionedMultiSelect
          items={items}
          IconRenderer={Icon}
          uniqueKey="id"
          onSelectedItemsChange={setSelectedItems}
          selectedItems={selectedItems}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...GlobalStyles.field,
    ...{
      justifyContent: 'center',
      width: '100%',
    },
  },
});

export default MultiselectDropdownField;