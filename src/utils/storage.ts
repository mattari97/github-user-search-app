import type { TLocalStorageKey } from '@/types';

const getLocalStorageData = <T>(key: TLocalStorageKey, defaultValue: T) => {
  const json = localStorage.getItem(key);
  return null === json ? defaultValue : (JSON.parse(json) as T);
};

const setLocalStorageData = <T>(key: TLocalStorageKey, data: T) => {
  localStorage.setItem(key, JSON.stringify(data));
};

export { getLocalStorageData, setLocalStorageData };
