import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from "react-native";
import { useDispatch, useSelector } from 'react-redux';
import { setFormData } from "@/redux/slices/FormSlice";
import { Layout } from "@/constants/Layout";
import TextView from "../view/TextView";
import i18n from "@/translation/i18n";
import BoxView from "../view/BoxView";
import IconView from "../view/IconView";
import ListView from "../view/ListView";
import SpinnerView from "../view/SpinnerView";
import EntityManager from '@/manager/EntityManager';
import InputTextField from '../field/InputTextField';
import ProfileListItemView from '../view/ProfileListItemView';
import FormManager from '@/manager/FormManager';

type Props = {
  resource?: any;
  fieldKey?: any;
  parentKey?: any;
  rules?: any;
};

const pageSize: number = 9;

const CollaboratorsList = ({ resource, fieldKey, parentKey, rules }: Props) => {
  const [profilesData, setProfilesData] = useState<any>(null);
  const [selectedProfiles, setSelectedProfiles] = useState<any>([]);
  const [searchValue, setSearchValue] = useState<string>('');
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const formData: any = useSelector((state: any) => state.form[resource]);

  const clearSearch = async () => {
    setIsSearching(true);
    setProfilesData(await getProfilesData());
    setIsSearching(false);
    setSearchValue('');
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

  const onSubmitEditing = async () => {
    setIsSearching(true);

    let payload: any = {
      page_size: pageSize,
    };

    if (!!searchValue.length) {
      payload = {
        ...payload,
        ...{
          query_text: searchValue,
        },
      };
    }

    setProfilesData(await EntityManager.listProfiles(payload));
    setIsSearching(false);
  };

  const toggleItem = (entityId: number) => {
    let profileList = [...selectedProfiles];
    if (profileList.includes(entityId)) {
      profileList = profileList.filter((value: number) => value !== entityId);
    }
    else {
      profileList.push(entityId);
    }

    setSelectedProfiles(profileList);

    if (resource && fieldKey && !parentKey) {
      FormManager.updateField(resource, fieldKey, profileList, rules);
    }
    else if (resource && fieldKey && parentKey) {
      FormManager.updateField(resource, `${parentKey}.${fieldKey}`, profileList, rules);
    }
  };

  const getProfilesData = async () => {
    let payload: any = {
      page_size: pageSize,
    };

    return await EntityManager.listProfiles(payload);
  };

  useEffect(() => {
    (async () => {
      if (!isLoaded) {
        if (!profilesData) setProfilesData(await getProfilesData());
        if (formData?.[fieldKey]?.length && !selectedProfiles.length) {
          setSelectedProfiles(formData[fieldKey]);
        }

        setIsLoaded(true);
      }
    })();
  }, [profilesData, formData, fieldKey, selectedProfiles]);

  if (!isLoaded) return <SpinnerView />;

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

      {profilesData?.length > 0 && (
        <View style={Layout.borderedListContainer}>
          <ListView
            contentContainerStyle={styles.listContainer}
            data={profilesData}
            renderItem={(row: any) => (
              <ProfileListItemView
                row={row}
                selected={selectedProfiles.includes(row.item.id)}
                onListItemPress={(o: any) => toggleItem(o.item.id)}
              />
            )}
          />
        </View>
      )}

      {!profilesData?.length &&
        <TextView>{i18n.t('No collaborators found.')}</TextView>
      }
    </BoxView>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    gap: Layout.space.base/2,
  },
  inputTextFieldContainer: {
    backgroundColor: Layout.colors.white,
    borderWidth: Layout.borderWidth.base,
    borderRadius: Layout.radius.round,
    borderColor: Layout.colors.primary,
  },
});

export default CollaboratorsList;
