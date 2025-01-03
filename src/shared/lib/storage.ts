import { useSyncExternalStore } from "react";
import { cookieStorage } from "./cookie-storage";
import { isEqual } from "lodash";


export type Storage<T> = {
  get: () => T;
  set: (V: T) => void;
  clear: () => void;
  subscribe: (fn: (V: T) => void) => () => void;
  unsubscribe: (fn: (V: T) => void) => void;
};

export const Storage = <T>(initialValue: T): Storage<T> => {
  let value: T = initialValue;
  const subscribtions = new Set<(V: T) => void>();
  return {
    get: () => value as T,
    set: (newValue) => {
      if (value === newValue) return void "Value Should not change";
      value = newValue;
      return void subscribtions.forEach((fn) => fn(value as T));
    },
    clear: () => {
      value = initialValue;
      return void subscribtions.forEach((fn) => fn(value as T));
    },
    subscribe: (fn) => {
      subscribtions.add(fn);
      return () => subscribtions.delete(fn);
    },
    unsubscribe: (fn) => {
      subscribtions.delete(fn);
    },
  };
};

type StorageTypes = "localStorage" | "sessionStorage" | "cookieStorage";
const storageFactory = (type?: StorageTypes) => {
  const storageMap = {
    localStorage: window.localStorage,
    sessionStorage: window.sessionStorage,
    cookieStorage,
  };
  const t = type ?? "cookieStorage";
  return storageMap[t];
};

export const persistentStorage = <T>(
  key: string,
  value: T,
  storageType?: StorageTypes,
  config?: { expiresIn?: number; defaultValue?: string }
): Storage<T> => {
  const pStorage = storageFactory(storageType);
  const lsvalue = pStorage.getItem(key) || config?.defaultValue || "null";
  const instance = Storage<T>(JSON.parse(lsvalue) ?? value);
  const initialSet = instance.set;
  const initialClear = instance.clear;

  instance.set = (newValue) => {
    pStorage.setItem(key, JSON.stringify(newValue), config?.expiresIn);
    initialSet(newValue);
  };
  instance.clear = () => {
    initialClear();
    pStorage.removeItem(key);
  };
  setInterval(() => {
    const persistantValue =
      pStorage.getItem(key) || config?.defaultValue || "null";
    const inMemory = instance.get;
    const parsedPersistant = JSON.parse(persistantValue);
    if (!isEqual(parsedPersistant, inMemory)) {
      initialSet(parsedPersistant);
    }
  }, 1000);
  return instance;
};

export const useStore = <K>(store: Storage<K>) => {
  const piece = useSyncExternalStore<K>(store.subscribe, store.get);
  return [piece, store.set] as const;
};
