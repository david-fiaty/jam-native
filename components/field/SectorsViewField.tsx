import React, { useState, useEffect } from "react";
import { useSelector, shallowEqual } from "react-redux";
import TextView from "../view/TextView";
import i18n from "@/translation/i18n";

type Props = {
  idArray: any;
};

const SectorsViewField = ({ idArray }: Props) => {
  const [sectorsData, setSectorsData] = useState<any[]>([]);
  const appState = useSelector((state: any) => state.app, shallowEqual);

  const renderComponent = () => {
    if (!idArray?.length) {
      return <TextView>{i18n.t('Unavailable')}</TextView>
    }

    let sectors: any[] = (sectorsData || []).filter((o: any) => idArray.includes(o.id));

    if (!sectors?.length) {
      return (
        <TextView>{i18n.t('Unavailable')}</TextView>
      );
    }

    return (
      <TextView>
        {sectors.map((sector: any, i: number) => {
          return (
            <TextView key={sector.id}>
              {sector.name}
              {(i < sectors.length - 1) && (<TextView>, </TextView>)}
            </TextView>
          );
        })}
      </TextView>
    );
  };

  useEffect(() => {
    setSectorsData(appState.sectorsData);
  }, [appState]);

  return renderComponent();
};

export default SectorsViewField;
