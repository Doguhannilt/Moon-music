export const encryption = (id) => id
    .replace(/-/g, '+')
    .replace(/_/g, '/')
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');