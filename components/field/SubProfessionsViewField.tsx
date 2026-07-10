import React, { useState, useEffect } from "react";
import { useSelector, shallowEqual } from "react-redux";
import TextView from "../view/TextView";
import i18n from "@/translation/i18n";

type Props = {
  idArray: any;
};

const SubProfessionsViewField = ({ idArray }: Props) => {
  const [professionsData, setProfessionsData] = useState<any[]>([]);
  const appState = useSelector((state: any) => state.app, shallowEqual);

  const renderComponent = () => {
    if (!idArray?.length) {
      return <TextView>{i18n.t('Unavailable')}</TextView>
    }

    let subProfessions: any[] = (professionsData
      .filter((o: any) => idArray.includes(o.id))
      .map((sector: any) => sector.sub_sectors))
      .flat()
      .filter((o: any) => idArray.includes(o.id));

    if (!subProfessions?.length) {
      return (
        <TextView>{i18n.t('Unavailable')}</TextView>
      );
    }

    return (
      <TextView>
        {subProfessions.map((subSector: any, i: number) => {
          return (
            <TextView key={subSector.id}>
              {subSector.name}
              {(i < subProfessions.length - 1) && (<TextView>, </TextView>)}
            </TextView>
          );
        })}
      </TextView>
    );
  };

  useEffect(() => {
    setProfessionsData(appState.professionsData);
  }, [appState]);

  return renderComponent();
};

export default SubProfessionsViewField;
