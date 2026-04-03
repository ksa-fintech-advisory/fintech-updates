/**
 * Profile photo for header + about page.
 * Add your image as `public/images/profile.jpg` (or png/webp — update path below / env).
 */
export const PUBLIC_PROFILE_IMAGE_SRC =
  (typeof process !== 'undefined' && process.env.NEXT_PUBLIC_PROFILE_IMAGE_PATH?.trim()) ||
  '/images/profile.jpg';
