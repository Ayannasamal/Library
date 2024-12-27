import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthService, LoginCredentials } from '../services/auth.service';
import toast from 'react-hot-toast';

export function useAuthForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const navigate = useNavigate();

  const handleLogin = async (credentials: LoginCredentials) => {
    setIsLoading(true);
    setErrors({});

    try {
      const validation = AuthService.validateCredentials(credentials);
      if (!validation.isValid) {
        setErrors(validation.errors);
        return;
      }

      await AuthService.login(credentials);
      toast.success('Successfully signed in!');
      navigate('/');
    } catch (error: any) {
      if (error.message?.includes('Invalid login credentials')) {
        setErrors({ auth: 'Invalid email or password' });
      } else {
        toast.error('Failed to sign in. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    errors,
    handleLogin
  };
}