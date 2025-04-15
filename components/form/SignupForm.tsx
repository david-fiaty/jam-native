import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setValue } from "@/redux/slices/SignupSlice";
import SignupCodeForm from './signup-form/SignupCodeForm';
import SignupEmailForm from './signup-form/SignupEmailForm';
import ProfileForm from "./ProfileForm";
import DataManager from "@/manager/DataManager";

const SignupForm = () => {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const formData: any = useSelector((state: any) => state.signup);

  useEffect(() => {
    if (!isLoaded) {
      dispatch(setValue(null));
      setIsLoaded(true);
    }
  }, [isLoaded]);
  
  return (
    <>
      {formData?.success !== true && <SignupEmailForm key={DataManager.createUuid()} />}
      {formData?.success !== true && formData?.session?.length > 0 && <SignupCodeForm key={DataManager.createUuid()} />}
      {formData?.success === true && <ProfileForm key={DataManager.createUuid()} />}
    </>
  );
};

export default SignupForm;