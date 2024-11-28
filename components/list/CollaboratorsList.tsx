import { useState } from 'react';
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { useDispatch, useSelector } from 'react-redux';
import { setJamData } from '@/redux/slices/AddJamSlice';
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
  const dispatch = useDispatch();
  const jamData = useSelector((state: any) => state.addJam);
  const [profiles, setProfiles] = useState<any>(null);
  const [selectedProfiles, setSelectedProfiles] = useState<any>([]);
  const [searchValue, setSearchValue] = useState<string>('');
  const [isSearching, setIsSearching] = useState<boolean>(false);

  if (jamData?.collaborators_ids?.length && !selectedProfiles.length) {
    setSelectedProfiles(jamData.collaborators_ids);
  }

  const clearSearch = () => {
    setIsSearching(true);
    EntityManager.getProfiles().then((items: any) => {
      setProfiles(items);
      setIsSearching(false);
      setSearchValue('');
    });
  };

  const renderSearchIcon = () => {
    if (!isSearching && searchValue) {
      return <IconView 
        name="delete" 
        theme="clear" 
        onPress={clearSearch}
      />;
    }
    else if (isSearching) {
      return <SpinnerView size="small" />;
    }

    return <></>;
  };

  const onSubmitEditing = () => {
    setIsSearching(true);
    let options = searchValue.length ? { query_text: searchValue } : {};

    EntityManager.getProfiles(options).then((items: any) => {
      setIsSearching(false);
      setProfiles(items);
    });
  };

  const toogleProfile = (entityId: number) => {
    let profileList = [...selectedProfiles];
    if (profileList.includes(entityId)) {
      profileList = profileList.filter((value: number) => value !== entityId);
    }
    else {
      profileList.push(entityId);
    }
    
    setSelectedProfiles(profileList);
    dispatch(setJamData<any>({ key: 'collaborators_ids', value: profileList}));
  };

  if (!profiles) {
    EntityManager.getProfiles().then((items: any) => {
      setProfiles(items);
    });
  }

  if (!profiles || !profiles) return <SpinnerView />;

  const renderItem = (row: any) => (
    <TouchableOpacity 
      key={row.item.id}
      onPress={() => toogleProfile(row.item.id)}
    >
      <BoxView direction="row" align="center" justify="flex-start" style={Layout.listItem}>
        <IconView name="user" theme="tertiary" />
        <TextView>{row.item.profile_name}</TextView>
        { selectedProfiles.includes(row.item.id) &&
          <IconView name="checkmark" theme="clear" size={14} />
        }
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
        value={searchValue}
        containerStyle={styles.inputTextFieldContainer}
        placeholder={i18n.t('Search...')} 
        onChangeText={(text: string) => setSearchValue(text)}
        onSubmitEditing={onSubmitEditing}
        rightIcon={renderSearchIcon}
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
