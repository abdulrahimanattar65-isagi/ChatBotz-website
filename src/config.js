// All links to the existing ChatBotz SaaS app are configured here via .env.
// The marketing site never talks to the SaaS backend; it only links to it.
export const LOGIN_URL = import.meta.env.VITE_LOGIN_URL || '#'
export const SIGNUP_URL = import.meta.env.VITE_SIGNUP_URL || '#'
export const SITE_URL = import.meta.env.VITE_SITE_URL || ''
export const CONTACT_EMAIL = import.meta.env.VITE_CONTACT_EMAIL || 'hello@example.com'
