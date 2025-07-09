// app/verify-users/page.jsx

/* prettier-ignore-file */
/* eslint-disable */

import VerifyUsersChild from './VerifyUsersChild';

export const metadata = {
  title: 'Verify Users',
};

export default function VerifyUsersParent() {
  return (
    <VerifyUsersChild />
  );
}
