export type TTheme = 'light' | 'dark';
export type TThemeLabel = 'Light' | 'Dark';

export type TSearchError = 'No results' | '';

export type TLocalStorageKey = 'theme' | 'username';
export type TGitHubAPIProfile = {
  login: string | null;
  avatarUrl: string | null;
  gravatarId: string | null;
  url: string | null;
  html_url: string | null;
  reposUrl: string | null;
  name: string | null;
  company: string | null;
  blog: string | null;
  location: string | null;
  bio: string | null;
  twitterUsername: string | null;
  publicRepos: string | null;
  followers: string | null;
  following: string | null;
  createdAt: string | null;
};
