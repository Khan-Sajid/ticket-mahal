import { createTransform } from "redux-persist";

export const createExpirationTransform = (
  expireIn: number,
  expireKey: string = "persistencyExpiration"
) => {
  let expired = false;
  try {
    let storedExpiration: string | null = localStorage.getItem(expireKey);
    const expiring = storedExpiration ? parseInt(storedExpiration) : 1;
    const now = new Date().getTime();
    expired = Boolean(expiring) && !isNaN(expiring) && now > expiring;
  } catch (e) {}

  return createTransform(
    (inboundState: any, key) => {
      if (expired) {
        const expireValue = (new Date().getTime() + expireIn * 1000).toString();
        localStorage.setItem(expireKey, expireValue);
        return { ...inboundState, timestamp: expireValue };
      } else return { ...inboundState };
    },
    (outboundState, key) => {
      if (expired) {
        return undefined; // Purge if expired
      } else return outboundState;
    }
  );
};
