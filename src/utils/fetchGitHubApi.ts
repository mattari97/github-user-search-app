import type { TGitHubAPIProfile } from '@/types';
import getErrorMessage from './getErrorMessage';
import formatDate from './formatDate';

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
    const data = formatGitHubApiData(json);

    if (!data) {
      throw new Error('API error: Unexpected data format received');
    }

    return { data };
  } catch (error) {
    return { error: getErrorMessage(error) };
  }
};

export default fetchApi;

export const GITHUB_API_EXPECTED_KEYS: (keyof TGitHubAPIProfile)[] = [
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

export const GITHUB_API_DEFAULT_VALUES = {
  bio: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur recusandae sapiente dignissimos modi.',
  links: 'Not Available',
};

export const isValidGitHubApiData = (data: unknown): boolean => {
  if ('object' !== typeof data || null === data) {
    return false;
  }

  return GITHUB_API_EXPECTED_KEYS.every(key => key in data);
};

export const formatGitHubApiData = (
  data: Record<string, string | null>,
): TGitHubAPIProfile | null => {
  if (!isValidGitHubApiData(data)) {
    return null;
  }

  for (const key in data) {
    if (data[key] === null) {
      data[key] = '';
    }

    if ('created_at' === key) {
      data[key] = formatDate(data[key]);
    }
  }

  return data as TGitHubAPIProfile;
};

export const generateGitHubApiEmptyObject = (): TGitHubAPIProfile => {
  return GITHUB_API_EXPECTED_KEYS.reduce((obj, key) => {
    obj[key] = '';
    return obj;
  }, {} as TGitHubAPIProfile);
};
