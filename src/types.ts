export type TTheme = 'light' | 'dark';
export type TThemeLabel = 'Light' | 'Dark';

export type TSearchError = 'No results' | '';

export type TLocalStorageKey = 'theme' | 'username';
export type TGitHubAPIProfile = {
  avatar_url: string;
  login: string;
  gravatar_id: string;
  url: string;
  html_url: string;
  repos_url: string;
  name: string;
  company: string;
  blog: string;
  location: string;
  bio: string;
  twitter_username: string;
  public_repos: string;
  followers: string;
  following: string;
  created_at: string;
};
