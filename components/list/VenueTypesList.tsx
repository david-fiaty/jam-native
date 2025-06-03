import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from 'react-redux';
import { setFormData } from "@/redux/slices/FormSlice";
import { Layout } from "@/constants/Layout";
import BoxView from "../view/BoxView";
import ListView from "../view/ListView";
import SpinnerView from "../view/SpinnerView";
import EntityManager from '@/manager/EntityManager';
import ProfileListItem from './list-item/ProfileListItem';
import TextView from '../view/TextView';
import IconView from '../view/IconView';

type Props = {
  resource: string;
  field?: any;
};

const VenueTypesList = ({ resource, field }: Props) => {
  const dispatch = useDispatch();
  const [venues, setVenues] = useState<any>(null);
  const [selectedVenues, setSelectedVenues] = useState<any>([]);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const formData: any = useSelector((state: any) => state.form[resource]);

  const toggleItem = (entityId: number) => {
    let venueList = [...selectedVenues];
    if (venueList.includes(entityId)) {
      venueList = venueList.filter((value: number) => value !== entityId);
    }
    else {
      venueList.push(entityId);
    }

    setSelectedVenues(venueList);

    dispatch(setFormData<any>({
      resource: resource,
      key: field,
      value: venueList,
    }));
  };

  const renderItem = (row: any) => {
    let selected: boolean = selectedVenues.includes(row.item.id);

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
    (async () => {
      if (!isLoaded) {
        if (!venues) setVenues(await EntityManager.getVenueTypes());
        if (formData?.[field]?.length && !selectedVenues.length) {
          setSelectedVenues(formData[field]);
        }

        setIsLoaded(true);
      }
    })();
  }, [venues, formData, field, selectedVenues]);

  if (!isLoaded) return <SpinnerView />;

  return (
    <BoxView align="flex-start" justify="flex-start" style={Layout.screenContent}>
      <View style={Layout.borderedListContainer}>
        {venues?.length > 0 &&
          <ListView
            data={venues}
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
      padding: Layout.space.base / 1.3,
    },
  },
});

export default VenueTypesList;
