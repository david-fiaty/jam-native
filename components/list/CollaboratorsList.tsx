import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from "react-native";
import { useDispatch, useSelector } from 'react-redux';
import { setFormData } from "@/redux/slices/FormSlice";
import { Layout } from "@/constants/Layout";
import { Colors } from '@/constants/Colors';
import TextView from "../view/TextView";
import i18n from "@/translation/i18n";
import BoxView from "../view/BoxView";
import IconView from "../view/IconView";
import ListView from "../view/ListView";
import SpinnerView from "../view/SpinnerView";
import ScreenManager from "@/manager/ScreenManager";
import EntityManager from '@/manager/EntityManager';
import InputTextField from '../field/InputTextField';
import ProfileListItem from './ListItem/ProfileListItem';

type Props = {
  resource: string;
  field?: any;
};

const CollaboratorsList = ({ resource, field }: Props) => {
  const dispatch = useDispatch();
  const [profiles, setProfiles] = useState<any>(null);
  const [selectedProfiles, setSelectedProfiles] = useState<any>([]);
  const [searchValue, setSearchValue] = useState<string>('');
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const activeModal: any = ScreenManager.getActiveModal();
  const formData: any = useSelector((state: any) => state.form[resource]);

  const clearSearch = () => {
    setIsSearching(true);
    
    EntityManager.listProfiles().then((items: any) => {
      setProfiles(items);
      setIsSearching(false);
      setSearchValue('');
    });
  };

  const renderSearchIcon = () => {
    if (!isSearching && searchValue) {
      return (
        <IconView 
          name="delete" 
          theme="clear" 
          onPress={clearSearch}
        />
      );
    }
    else if (isSearching) {
      return <SpinnerView size="small" />;
    }

    return <></>;
  };

  const onSubmitEditing = () => {
    setIsSearching(true);
    let options = searchValue.length ? { query_text: searchValue } : {};

    EntityManager.listProfiles(options).then((items: any) => {
      setIsSearching(false);
      setProfiles(items);
    });
  };

  const toggleProfile = (entityId: number) => {
    let profileList = [...selectedProfiles];
    if (profileList.includes(entityId)) {
      profileList = profileList.filter((value: number) => value !== entityId);
    }
    else {
      profileList.push(entityId);
    }
    
    setSelectedProfiles(profileList);

    dispatch(setFormData<any>({ 
      resource: resource,
      key: field, 
      value: profileList,
    }));
  };

  useEffect(() => {
    (async () => {
      if (!isLoaded) { 
        if (!profiles) setProfiles(await EntityManager.listProfiles());
        if (formData?.[field]?.length && !selectedProfiles.length) {
          setSelectedProfiles(formData[field]);
        }
      }
    })();

    setIsLoaded(true);
  }, [profiles, formData, field, activeModal, selectedProfiles]);

  return (
    <BoxView align="flex-start" justify="flex-start" style={Layout.screenContent}>
      <InputTextField 
        value={searchValue}
        containerStyle={styles.inputTextFieldContainer}
        placeholder={i18n.t('Search...')} 
        onChangeText={(text: string) => setSearchValue(text)}
        onSubmitEditing={onSubmitEditing}
        rightIcon={renderSearchIcon()}
      />

      <View style={Layout.borderedListContainer}>
        {profiles?.length > 0 &&
          <ListView
            data={profiles}
            renderItem={(row: any) => (
              <ProfileListItem 
                item={row.item}
                selected={selectedProfiles.includes(row.item.id)}
                onPress={() => toggleProfile(row.item.id)}
              />
            )}
          />
        }

        {!profiles?.length && 
          <TextView>{i18n.t('No collaborators found.')}</TextView>
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
    fontSize: Layout.fontSize.base,
  }
});

export default CollaboratorsList;
