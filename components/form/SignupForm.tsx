import { useSelector } from "react-redux";
import SignupCodeForm from './signup-form/SignupCodeForm';
import SignupEmailForm from './signup-form/SignupEmailForm';
import ProfileForm from "./ProfileForm";

const SignupForm = () => {
  const formData: any = useSelector((state: any) => state.signup);

  return (
    <>
      {formData?.success !== true && <SignupEmailForm />}
      {formData?.success !== true && formData?.session?.length > 0 && <SignupCodeForm />}
      {formData?.success === true && <ProfileForm />}
    </>
  );
};

export default SignupForm;