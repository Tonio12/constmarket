export const isAuthenticated = () => {
  if (typeof window === 'undefined') return false;
  return Boolean(localStorage.getItem('token'));
};

export const requireAuth = (callback: () => void, onUnauthenticated?: () => void) => {
  if (isAuthenticated()) {
    callback();
    return true;
  }
  onUnauthenticated?.();
  return false;
};

