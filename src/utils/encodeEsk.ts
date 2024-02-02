export const doubleEncodeEsk = (esk: Record<string, unknown>): string => {
  const stringifiedEsk = JSON.stringify(esk);
  const base64EncodedEsk = btoa(stringifiedEsk);
  const doubleEncodedEsk = encodeURIComponent(base64EncodedEsk);
  return doubleEncodedEsk;
};
