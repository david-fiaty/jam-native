import React, { useState, useEffect } from "react";
import { useSelector, shallowEqual } from "react-redux";
import TextView from "../view/TextView";
import i18n from "@/translation/i18n";

type Props = {
  idArray: any;
};

const ProfessionsViewField = ({ idArray }: Props) => {
  const [professionsData, setProfessionsData] = useState<any[]>([]);
  const appState = useSelector((state: any) => state.app, shallowEqual);

  const renderComponent = () => {
    if (!idArray?.length) {
      return <TextView>{i18n.t('Unavailable')}</TextView>
    }

    let professions: any[] = professionsData.filter((o: any) => idArray.includes(o.id));

    if (!professions?.length) {
      return (
        <TextView>{i18n.t('Unavailable')}</TextView>
      );
    }

    return (
      <TextView>
        {professions.map((sector: any, i: number) => {
          return (
            <TextView key={sector.id}>
              {sector.name}
              {(i < professions.length - 1) && (<TextView>, </TextView>)}
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

export default ProfessionsViewField;
