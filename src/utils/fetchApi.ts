import type { TGitHubAPIProfile } from '@/types';
import getErrorMessage from './getErrorMessage';

type ReturnType = {
  data?: TGitHubAPIProfile;
  error?: string;
};

const fetchApi = async (username: string): Promise<ReturnType> => {
  try {
    const response = await fetch(`https://api.github.com/users/${username}`);

    if (404 === response.status) {
      return {};
    }

    if (!response.ok) {
      throw new Error(`API error: ${response.statusText}`);
    }

    const json = await response.json();

    if ('object' !== typeof json || null === json) {
      throw new Error('API error: Response is not a valid object');
    }

    if (!isValidGitHubApiData(json)) {
      throw new Error('API error: Unexpected data format received');
    }

    return { data: json };
  } catch (error) {
    return { error: getErrorMessage(error) };
  }
};

export default fetchApi;

export const gitHubApiExpectedKeys: (keyof TGitHubAPIProfile)[] = [
  'avatar_url',
  'bio',
  'blog',
  'company',
  'created_at',
  'followers',
  'following',
  'gravatar_id',
  'html_url',
  'location',
  'login',
  'name',
  'public_repos',
  'repos_url',
  'twitter_username',
  'url',
];

export const isValidGitHubApiData = (data: unknown): boolean => {
  if ('object' !== typeof data || null === data) {
    return false;
  }

  return gitHubApiExpectedKeys.every(key => key in data);
};

export const generateGitHubApiEmptyObject = (): TGitHubAPIProfile => {
  return gitHubApiExpectedKeys.reduce((obj, key) => {
    obj[key] = '';
    return obj;
  }, {} as TGitHubAPIProfile);
};
