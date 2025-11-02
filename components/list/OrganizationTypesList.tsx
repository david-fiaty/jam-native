import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { useSelector, shallowEqual } from 'react-redux';
import { Layout } from "@/constants/Layout";
import BoxView from "../view/BoxView";
import ListView from "../view/ListView";
import SpinnerView from "../view/SpinnerView";
import TextView from '../view/TextView';
import IconView from '../view/IconView';
import FormManager from '@/manager/FormManager';

type Props = {
  resource: string;
  fieldKey?: any;
  parentKey?: any;
};

const OrganizationTypesList = ({ resource, fieldKey, parentKey }: Props) => {
  const [organizationTypes, setOrganizationTypes] = useState<any>(null);
  const [selectedOrganizations, setSelectedOrganizations] = useState<any>([]);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const formData: any = useSelector((state: any) => state.form[resource]);
  const appState = useSelector((state: any) => state.app, shallowEqual);

  const toggleItem = (entityId: number) => {
    let selectedIds: any[] = [...selectedOrganizations];

    if (selectedIds.includes(entityId)) {
      selectedIds = selectedIds.filter((value: number) => value !== entityId);
    }
    else {
      selectedIds.push(entityId);
    }

    setSelectedOrganizations(selectedIds);

    if (resource && fieldKey && !parentKey) {
      FormManager.updateField(resource, fieldKey, selectedIds);
    }
    else if (resource && fieldKey && parentKey) {
      FormManager.updateField(resource, `${parentKey}.${fieldKey}`, selectedIds);
    }
  };

  const renderItem = (row: any) => {
    let selected: boolean = selectedOrganizations.includes(row.item.id);

    return (
      <TouchableOpacity
        key={row?.item?.id}
        onPress={() => toggleItem(row?.item?.id)}
      >
        <BoxView
          direction="row"
          align="center"
          justify="flex-start"
          style={styles.container}
        >
          <TextView>{row?.item?.name}</TextView>
          {selected &&
            <IconView
              name="checkmark"
              theme="clear"
              size={14}
            />
          }
        </BoxView>
      </TouchableOpacity>
    );
  };

  useEffect(() => {
    if (!isLoaded) {
      if (!organizationTypes) setOrganizationTypes(appState.organizationTypesData);
      setSelectedOrganizations(formData?.[parentKey]?.[fieldKey] || []);
      setIsLoaded(true);
    }
  }, [organizationTypes, formData, fieldKey, parentKey, selectedOrganizations, appState]);

  if (!isLoaded) return <SpinnerView />;

  return (
    <BoxView align="flex-start" justify="flex-start" style={Layout.screenContent}>
      <View style={Layout.borderedListContainer}>
        {organizationTypes?.length > 0 &&
          <ListView
            data={organizationTypes}
            renderItem={(row: any) => renderItem(row)}
          />
        }
      </View>
    </BoxView>
  );
};

const styles = StyleSheet.create({
  container: {
    ...Layout.listItem,
    ...{
      padding: Layout.space.base,
    },
  },
});

export default OrganizationTypesList;
