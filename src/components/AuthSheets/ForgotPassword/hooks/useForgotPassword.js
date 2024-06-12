import {useRef, useState} from 'react';
import {forgotPassword} from '../../../../services';

const useForgotPassword = () => {
  const [email, setEmail] = useState();
  const [isSendPress, setIsSendPress] = useState(false);
  const [loading, setLoading] = useState(false);
  const emailSentRef = useRef();

  const handleForgotPassword = async forgotPasswordRef => {
    // forgotPasswordRef.current?.close();
    // emailSentRef.current?.open();
    try {
      setLoading(true);
      // const prepData = {email};
      console.log('body_OfForgotPassowrd_USE_FORGOT_PASSWORD', email);
      if (email) {
        const res = await forgotPassword({email});
        console.log('resOfForgotPassowrd_USE_FORGOT_PASSWORD', res, email);
        setLoading(false);
        if (res.success) {
          // forgotPasswordRef.current?.close();
          emailSentRef.current?.open();
        }
        return res;
      }
    } catch (err) {
      setLoading(false);
      // setIsError(true);
    }
  };

  return {
    email,
    setEmail,
    handleForgotPassword,
    emailSentRef,
    isSendPress,
  };
};

export default useForgotPassword;
