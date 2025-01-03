import { Storage, useStore } from "../../../shared/lib/storage";

export const MERCK = "Merck" as const;
export const NON_MERCK = "Non-Merck" as const;

export type Flow = {
  name: typeof MERCK | typeof NON_MERCK;
};
const flowState = {
  name: MERCK,
} as Flow;

export const flow = Storage(flowState)
export const useFlow = () => useStore(flow)
