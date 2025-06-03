import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from "react-native";
import { useDispatch, useSelector } from 'react-redux';
import { setFormData } from "@/redux/slices/FormSlice";
import { Layout } from "@/constants/Layout";
import BoxView from "../view/BoxView";
import ListView from "../view/ListView";
import SpinnerView from "../view/SpinnerView";
import EntityManager from '@/manager/EntityManager';
import ProfileListItem from './list-item/ProfileListItem';
import TextView from '../view/TextView';

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

  useEffect(() => {
    (async () => {
      if (!isLoaded) { 
        if (!venues) setVenues(await EntityManager.listProfiles());
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
            renderItem={(row: any) => (
              <TextView>{row.item.id}</TextView>
            )}
          />
        }
      </View>
    </BoxView>
  );
};

const styles = StyleSheet.create({
});

export default VenueTypesList;
