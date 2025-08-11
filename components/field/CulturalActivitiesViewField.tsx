import React, { useState, useEffect } from "react";
import TextView from '../view/TextView';
import EntityManager from "@/manager/EntityManager";

type Props = {
  idArray: any;
};

const CulturalActivitiesViewField = ({ idArray }: Props) => {
  const [activitiesData, setActivitiesData] = useState<any[]>([]);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  const renderComponent = () => {
    let activities: any[] = activitiesData.filter((o: any) => idArray.includes(o.id));

    return (
      <TextView>
        {activities.map((o: any, i: number) => {
          return (
            <TextView key={o.id}>
              {o.name}
              {(i < activities.length - 1) && (<TextView>, </TextView>)}
            </TextView>
          );
        })}
      </TextView>
    );
  };

  useEffect(() => {
    (async () => {
      if (!isLoaded) {
        setActivitiesData(await EntityManager.getCulturalActivities());
        setIsLoaded(true);
      }
    })();
  }, [idArray, isLoaded]);

  return renderComponent();
};

export default CulturalActivitiesViewField;
