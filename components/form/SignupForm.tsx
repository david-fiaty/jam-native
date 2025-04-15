import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setValue } from "@/redux/slices/SignupSlice";
import SignupCodeForm from './signup-form/SignupCodeForm';
import SignupEmailForm from './signup-form/SignupEmailForm';
import ProfileForm from "./ProfileForm";

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
      {formData?.success !== true && <SignupEmailForm />}
      {formData?.success !== true && formData?.session?.length > 0 && <SignupCodeForm />}
      {formData?.success === true && <ProfileForm />}
    </>
  );
};

export default SignupForm;