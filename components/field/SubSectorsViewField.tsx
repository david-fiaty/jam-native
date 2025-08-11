import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import TextView from "../view/TextView";

type Props = {
  idArray: any;
};

const SubSectorsViewField = ({ idArray }: Props) => {
  const [sectorsData, setSectorsData] = useState<any[]>([]);
  const appState = useSelector((state: any) => state.app);

  useEffect(() => {
    setSectorsData(appState.sectorsData);
  }, [appState]);

  return (
    <TextView>SUB SECTORS VIEW FIELD</TextView>
  );
};

export default SubSectorsViewField;
