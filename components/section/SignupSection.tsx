import { useSelector } from "react-redux";
import SignupCodeForm from "../form/signup-form/SignupCodeForm";
import SignupEmailForm from "../form/signup-form/SignupEmailForm";
import ProfileForm from "../form/ProfileForm";

const SignupSection = () => {
  const formData: any = useSelector((state: any) => state.signup);

  return (
    <>
      {formData?.success !== true && <SignupEmailForm />}
      {formData?.success !== true && formData?.session?.length > 0 && <SignupCodeForm />}
      {formData?.success === true && <ProfileForm />}
    </>
  );
};

export default SignupSection;