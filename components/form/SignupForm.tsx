import { useSelector } from "react-redux";
import SignupCodeForm from './signup-form/SignupCodeForm';
import SignupEmailForm from './signup-form/SignupEmailForm';

const SignupForm = () => {
  const formData: any = useSelector((state: any) => state.signup);

  return (
    <>
      <SignupEmailForm />
      { formData?.session?.length > 0 && <SignupCodeForm /> }
    </>
  );
};

export default SignupForm;