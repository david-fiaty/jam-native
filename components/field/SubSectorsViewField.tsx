import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import TextView from "../view/TextView";
import i18n from "@/translation/i18n";

type Props = {
  idArray: any;
};

const SubSectorsViewField = ({ idArray }: Props) => {
  const [sectorsData, setSectorsData] = useState<any[]>([]);
  const appState = useSelector((state: any) => state.app);

  const renderComponent = () => {
    if (!idArray?.length) {
      return <TextView>{i18n.t('Unavailable')}</TextView>
    }

    let sectors: any[] = sectorsData.filter((o: any) => idArray.includes(o.id));

    return (
      <TextView>
        {sectors.map((sector: any, i: number) => {
          let subSectors: any[] = sector.sub_sectors.filter((o: any) => idArray.includes(o.id));

          return subSectors.map((subSector: any, i: number) => {
            return (
              <TextView key={subSector.id}>
                {subSector.name}
                {(i < subSectors.length - 1) && (<TextView>, </TextView>)}
              </TextView>
            );
          })
        })}
      </TextView>
    );
  };

  useEffect(() => {
    setSectorsData(appState.sectorsData);
  }, [appState]);

  if (!idArray?.length) {
    return <TextView>{i18n.t('Unavailable')}</TextView>
  }

  return renderComponent();
};

export default SubSectorsViewField;
