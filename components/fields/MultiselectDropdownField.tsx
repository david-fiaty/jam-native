import React, { useState } from 'react';
import { StyleSheet, View, StatusBar } from 'react-native';
import SectionedMultiSelect from 'react-native-sectioned-multi-select';
import { MaterialIcons as Icon } from '@expo/vector-icons';
import { GlobalStyles } from '@/constants/GlobalStyles';

const items = [
  { name: 'Cars', id: 1},
  { name: 'Vans', id: 2},
  { name: 'SUVs', id: 3},
  { name: 'Motorbikes', id: 4 },
  { name: 'Trucks', id: 5},
  {
    name: 'Fruits',
    id: 0,
    children: [
      {
        name: 'Apple',
        id: 10,
      },
      {
        name: 'Strawberry',
        id: 17,
      },
      {
        name: 'Pineapple',
        id: 13,
      },
      {
        name: 'Banana',
        id: 14,
      },
      {
        name: 'Watermelon',
        id: 15,
      },
      {
        name: 'Kiwi fruit',
        id: 16,
      },
    ],
  },
];

const MultiselectDropdownField = () => {
  const [selectedItems, setSelectedItems] = useState([]);

  return (
    <View style={styles.container}>
      <SectionedMultiSelect
        items={items}
        uniqueKey="id"
        subKey="children"
        modalAnimationType="slide"
        selectText="Industries"
        single={false}
        readOnlyHeadings={true}
        showDropDowns={true}
        expandDropDowns={true}
        animateDropDowns={true}
        hideConfirm={true}
        alwaysShowSelectText={true}
        IconRenderer={Icon}
        onSelectedItemsChange={setSelectedItems}
        selectedItems={selectedItems}
        styles={styles.modal}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...GlobalStyles.field,
    ...{
      flexDirection: 'row',
      justifyContent: 'center',
    }
  },
  modal: {
    modalWrapper: {
      marginTop: StatusBar.currentHeight + GlobalStyles.header.height,
      backgroundColor: '#FFFFFF',
    },
    scrollView: {
      backgroundColor: '#FFFFFF',
    },
    selectToggle: {},
    selectToggleText: GlobalStyles.text,
    searchTextInput: GlobalStyles.text,
  },
});

export default MultiselectDropdownField;