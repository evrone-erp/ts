import { LAST_LOGIN_STORAGE_KEY } from 'entities/auth/model/constants';
import { CURRENT_ORG_ID_STORAGE_KEY } from 'entities/organization/model/constants';

export function logout() {
  try {
    localStorage.removeItem(LAST_LOGIN_STORAGE_KEY);
    localStorage.removeItem(CURRENT_ORG_ID_STORAGE_KEY);
    window.location.reload();
  } catch (e) {
    console.error(e);
  }
}
