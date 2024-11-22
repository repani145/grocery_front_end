import { useState } from "react";
import SignupOptions from "../../components/signup_options/signup_options";
import UserSignup from "../../components/user_signup/usersignup";
import VendorSignup from "../../components/vendor_signup/vendor_signup";
import LandNavbar from "../../components/landNav/landNav";
import Footor from "../../components/LandFooter/landFooter";
import './signup.css'

const SignUp = () => {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  return (
    <>
      <LandNavbar />
      <br/>
      {/* <br/><br/><br/> */}
      {!selectedOption && (
        <SignupOptions onSelectOption={handleOptionSelect} />
      )}

      {selectedOption === 'UserSignup' && <UserSignup />}
      {selectedOption === 'VendorSignup' && <VendorSignup />}
      {/* {selectedOption === 'Login' && <Login />} */}
      <br/><br/><br/>
      <Footor />
    </>
  );
};

export default SignUp;
