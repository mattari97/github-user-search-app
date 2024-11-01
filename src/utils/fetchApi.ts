import getErrorMessage from './getErrorMessage';

type ReturnType = {
  data?: object;
  error?: string;
};

const fetchApi = async (username: string): Promise<ReturnType> => {
  try {
    const response = await fetch(`https://api.github.com/users/${username}`);

    if (404 === response.status) {
      return {};
    }

    if (!response.ok) {
      throw new Error('API error. Please try later');
    }

    const json = await response.json();

    if ('object' !== typeof json) {
      throw new Error('API error. Please try later');
    }

    return { data: json };
  } catch (error) {
    return { error: getErrorMessage(error) };
  }
};

export default fetchApi;
