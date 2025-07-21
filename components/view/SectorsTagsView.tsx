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

    // Todo - Render profile sectors
    (sectorsIds || []).map((item: any) => {
      console.log(item);
    });

    sectorsData.map((item: any) => {
      if ((sectorsIds || []).includes(item.id)) {
        data.push(<TagView key={item.id}>{item.name}</TagView>);  
      }
      else if (item?.sub_sectors?.length > 0) {
        item.sub_sectors.map((subitem: any) => {
          data.push(<TagView key={subitem.id}>{subitem.name}</TagView>);  
        });
      }
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
