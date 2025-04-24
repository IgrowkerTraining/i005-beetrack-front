import { useState } from "react";
import { UseFormSetError } from "react-hook-form";
import { RegisterFormData } from "@/components/login-registerComponents/registerSchema";

export const useEmailCheck = (emailCheckMutation: any) => {
  const [isCheckingEmail, setIsCheckingEmail] = useState(false);
  
  const checkEmailExists = async (
    email: string, 
    setError: UseFormSetError<RegisterFormData>
  ) => {
    if (!email) return false;
    
    setIsCheckingEmail(true);
   
    try {
      const exists = await emailCheckMutation.mutateAsync(email);
      if (exists) {
        setError('email', {type: 'manual', message: 'Este email ya ha sido utilizado'});
        setIsCheckingEmail(false);
        return false;
      }
      setIsCheckingEmail(false);
      return true;
    } catch (error) {
      setError('email', {type:'manual', message: 'Error comprobando el email. Por favor intentelo de nuevo'});
      setIsCheckingEmail(false);
      return false;
    }
  };

  return { isCheckingEmail, checkEmailExists };
};