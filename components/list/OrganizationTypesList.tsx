import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { setFormData } from "@/redux/slices/FormSlice";
import { Layout } from "@/constants/Layout";
import BoxView from "../view/BoxView";
import ListView from "../view/ListView";
import SpinnerView from "../view/SpinnerView";
import EntityManager from '@/manager/EntityManager';
import TextView from '../view/TextView';
import IconView from '../view/IconView';

type Props = {
  resource: string;
  field?: any;
  parent?: any;
};

const OrganizationTypesList = ({ resource, field, parent }: Props) => {
  const dispatch = useDispatch();
  const [venueTypes, setVenueTypes] = useState<any>(null);
  const [selectedOrganizations, setSelectedOrganizations] = useState<any>([]);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const formData: any = useSelector((state: any) => state.form[resource]);
  const appState = useSelector((state: any) => state.app, shallowEqual);

  const toggleItem = (entityId: number) => {
    let selectedIds: any[] = [...selectedOrganizations];
    let currentData: any = { ...formData };

    if (selectedIds.includes(entityId)) {
      selectedIds = selectedIds.filter((value: number) => value !== entityId);
    }
    else {
      selectedIds.push(entityId);
    }

    setSelectedOrganizations(selectedIds);

    dispatch(setFormData<any>({
      resource: resource,
      key: parent,
      value: {
        ...(currentData?.[parent] || {}),
        ...{ [field]: selectedIds },
      },
    }));
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
      if (!venueTypes) setVenueTypes(appState.venueTypesData);

      setSelectedOrganizations(formData?.[parent]?.[field] || []);
      setIsLoaded(true);
    }
  }, [venueTypes, formData, field, parent, selectedOrganizations, appState]);

  if (!isLoaded) return <SpinnerView />;

  return (
    <BoxView align="flex-start" justify="flex-start" style={Layout.screenContent}>
      <View style={Layout.borderedListContainer}>
        {venueTypes?.length > 0 &&
          <ListView
            data={venueTypes}
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
