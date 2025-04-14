import SignupCodeForm from './signup-form/SignupCodeForm';
import SignupEmailForm from './signup-form/SignupEmailForm';

const SignupForm = () => {
  return (
    <>
      <SignupEmailForm />
      <SignupCodeForm />
    </>
  );
};

export default SignupForm;