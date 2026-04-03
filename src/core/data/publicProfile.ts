/**
 * Profile photo for header + about page.
 * Default: `public/avatars/MOHAMMED_ABDO.JPG`. Override with `NEXT_PUBLIC_PROFILE_IMAGE_PATH`.
 */
export const PUBLIC_PROFILE_IMAGE_SRC =
  (typeof process !== 'undefined' && process.env.NEXT_PUBLIC_PROFILE_IMAGE_PATH?.trim()) ||
  '/avatars/MOHAMMED_ABDO.JPG';
