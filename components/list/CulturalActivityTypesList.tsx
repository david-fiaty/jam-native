import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { setFormData } from "@/redux/slices/FormSlice";
import { Layout } from "@/constants/Layout";
import BoxView from "../view/BoxView";
import ListView from "../view/ListView";
import SpinnerView from "../view/SpinnerView";
import TextView from '../view/TextView';
import IconView from '../view/IconView';

type Props = {
  resource: string;
  field?: any;
  parent?: any;
};

const CulturalActivityTypesList = ({ resource, field, parent }: Props) => {
  const dispatch = useDispatch();
  const [culturalActivityTypes, setCulturalActivityTypes] = useState<any>(null);
  const [selectedCulturalActivities, setSelectedCulturalActivities] = useState<any>([]);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const formData: any = useSelector((state: any) => state.form[resource]);
  const appState = useSelector((state: any) => state.app, shallowEqual);

  const toggleItem = (entityId: number) => {
    let selectedIds: any[] = [...selectedCulturalActivities];
    let currentData: any = { ...formData };

    if (selectedIds.includes(entityId)) {
      selectedIds = selectedIds.filter((value: number) => value !== entityId);
    }
    else {
      selectedIds.push(entityId);
    }

    setSelectedCulturalActivities(selectedIds);

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
    let selected: boolean = selectedCulturalActivities.includes(row.item.id);

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
      if (!culturalActivityTypes) setCulturalActivityTypes(appState.culturalActivityTypesData);

      setSelectedCulturalActivities(formData?.[parent]?.[field] || []);
      setIsLoaded(true);
    }
  }, [culturalActivityTypes, formData, field, parent, selectedCulturalActivities, appState]);

  if (!isLoaded) return <SpinnerView />;

  return (
    <BoxView align="flex-start" justify="flex-start" style={Layout.screenContent}>
      <View style={Layout.borderedListContainer}>
        {culturalActivityTypes?.length > 0 &&
          <ListView
            data={culturalActivityTypes}
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

export default CulturalActivityTypesList;
