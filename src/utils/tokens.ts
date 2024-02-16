export const isTokenExpired = (token: string): boolean => {
  const decodedToken = decodeToken(token);
  if (!decodedToken.exp) return true; // Expiration claim doesn't exist

  const expirationTime = decodedToken.exp * 1000; // Convert to milliseconds
  const currentTime = Date.now();

  return expirationTime < currentTime;
};

export const decodeToken = (token: string) => {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  return JSON.parse(window.atob(base64));
};
