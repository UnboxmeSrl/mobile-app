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
      if (email) {
        const res = await forgotPassword({email});
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
