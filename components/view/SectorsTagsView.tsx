import React, { useState, useEffect } from "react";
import TagView from "./TagView";
import EntityManager from "@/manager/EntityManager";

type Props = {
  idArray: any;
};

const SectorsTagsView = ({ idArray }: Props) => {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [sectorsData, setSectorsData] = useState<any>([]);
  const [sectorsIds, setSectorsIds] = useState<any>([]);

  const renderSectors = (sectorsIds?: any)  => {
    let data: any[] = [];

    (sectorsIds || []).map((subSectorId: any) => {
      sectorsData.map((sector: any) => {
        let subSector: any = sector.sub_sectors.find((o: any) => o.id == subSectorId);
        if (subSector) {
          data.push(<TagView key={subSector.id}>{subSector.name}</TagView>);  
        }
      });
    });

    return data;
  };

  useEffect(() => {
    (async () => {
      if (!isLoaded) {
        setSectorsData(await EntityManager.getSectors());
        setSectorsIds(idArray);
        setIsLoaded(true);
      }
    })();
  }, [isLoaded, idArray]);

  return (
    <>
      {renderSectors(sectorsIds)}
    </>
  );
};

export default SectorsTagsView;
