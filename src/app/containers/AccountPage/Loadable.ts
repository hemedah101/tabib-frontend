/**
 *
 * Asynchronously loads the component for AccountPage
 *
 */

import { lazyLoad } from 'utils/loadable';

export const AccountPage = lazyLoad(
  () => import('./index'),
  module => module.AccountPage,
);
