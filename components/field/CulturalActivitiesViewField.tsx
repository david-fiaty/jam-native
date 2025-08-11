import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Layout } from '@/constants/Layout';
import TextView from '../view/TextView';
import EntityManager from "@/manager/EntityManager";

type Props = {
  idArray: any;
};

const CulturalActivitiesViewField = ({ idArray }: Props) => {
  const [activitiesData, setActivitiesData] = useState<any[]>([]);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      if (!isLoaded) {
        setActivitiesData(await EntityManager.getCulturalActivities());
        setIsLoaded(true);
      }
    })();
  }, [idArray, isLoaded]);

  console.log(activitiesData)

  return (
    <TextView>
      {activitiesData.map((o: any, i: number) => {
        return (
          <TextView key={o.id}>
            {o.name}
            {(i < o.length - 1) && (<TextView>, </TextView>)}
          </TextView>
        );
      })}
    </TextView>
  );
};

export default CulturalActivitiesViewField;
