import { AppRequest } from '../models';

/**
 * @param {AppRequest} request
 * @returns {string}
 */
export function getUserIdFromRequest(request: AppRequest): string {
  const DEFAULT_USER_ID = 'f5ebe938-8ab4-4b13-a5a6-4e9098057287';
  return DEFAULT_USER_ID;
  // return request.user && request.user.id;
}
