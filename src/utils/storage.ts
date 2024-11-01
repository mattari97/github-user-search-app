import type { TLocalStorageKey } from '@/types';

const getLocalStorageData = (key: TLocalStorageKey) => {
  return localStorage.getItem(key);
};

const setLocalStorageData = (key: TLocalStorageKey, data: unknown) => {
  if ('undefined' === typeof data) {
    return;
  }

  if ('object' === typeof data) {
    localStorage.setItem(key, JSON.stringify(data));
    return;
  }

  localStorage.setItem(key, String(data));
};

export { getLocalStorageData, setLocalStorageData };
