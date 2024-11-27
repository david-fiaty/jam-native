import { useState } from 'react';
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { Layout } from "@/constants/Layout";
import { Colors } from '@/constants/Colors';
import TextView from "../view/TextView";
import BackButton from "../button/BackButton";
import i18n from "@/translation/i18n";
import BoxView from "../view/BoxView";
import IconView from "../view/IconView";
import ListView from "../view/ListView";
import SpinnerView from "../view/SpinnerView";
import ScreenManager from "@/manager/ScreenManager";
import EntityManager from '@/manager/EntityManager';
import InputTextField from '../field/InputTextField';

const CollaboratorsList = () => {
  const [profiles, setProfiles] = useState<any>(null);
  const [selectedProfiles, setSelectedProfiles] = useState<any>([]);
  const [searchValue, setSearchValue] = useState<string>('');

  const onSubmitEditing = () => {
    let options = searchValue.length ? { query_text: searchValue } : {};
    EntityManager.getProfiles(options).then((items: any) => {
      setProfiles(items);
    });
  };

  if (!profiles) {
    EntityManager.getProfiles().then((items: any) => {
      setProfiles(items);
    });
  }

  if (!profiles || !profiles) return <SpinnerView />;

  const renderItem = (row: any) => (
    <TouchableOpacity 
      onPress={() => console.log('clicked')}
    >
      <BoxView direction="row" align="center" justify="flex-start" style={Layout.listItem}>
        <IconView name="user" theme="tertiary" />
        <TextView>{row.item.profile_name}</TextView>
      </BoxView>
    </TouchableOpacity>
  );

  return (
    <BoxView align="flex-start" justify="flex-start" style={Layout.screenContent}>
      <BackButton
        title={i18n.t('Add collaborators')}
        onPress={() => ScreenManager.toggleModal('CollaboratorsList')}
      />
      
      <InputTextField 
        containerStyle={styles.inputTextFieldContainer}
        placeholder={i18n.t('Search...')} 
        onChangeText={(text: string) => setSearchValue(text)}
        onSubmitEditing={onSubmitEditing}
      />

      <View style={Layout.borderedListContainer}>
        {profiles?.length > 0 &&
          <ListView
            data={profiles}
            renderItem={(row: any) => renderItem(row)}
          />
        }

        {!profiles?.length && 
          <TextView>{i18n.t('No collaborators found for this query.')}</TextView>
        }
      </View>
    </BoxView>
  );
};

const styles = StyleSheet.create({
  inputTextFieldContainer: {
    backgroundColor: Colors.white,
    borderWidth: Layout.borderWidth.base,
    borderRadius: Layout.radius.round,
    borderColor: Colors.primary,
  },
  wecomeMessage: {
    textTransform: 'uppercase',
    fontSize: Layout.fontSize.base*1.1,
  }
});

export default CollaboratorsList;
