import axios from 'axios';

export const loginDriverHandlerService = async (phoneNumber: string, password: string) => {
  try {
    const response = await axios.post('http://localhost:3000/api/drivers/login', {
      phoneNumber,
      password,
    });

    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error('Login failed');
    }
  } catch (error) {
    console.error('Error logging in:', error);
    return null;
  }
};
