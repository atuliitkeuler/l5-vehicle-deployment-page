const EMAIL_REGEX = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;

export const getLocalStoreItem = (key: string): any | null => JSON.parse(localStorage.getItem(key) as string);

export const setLocalStoreItem = (key: string, value: string): void => localStorage.setItem(key, value);

export const isValidEmail = (email: string): boolean => EMAIL_REGEX.test(email);

export const checkDateDifference = (endDate: Date, startDate: Date) => Math.floor((Date.parse(endDate.toString()) - Date.parse(startDate.toString())) / 86400000);
