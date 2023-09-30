export const appName = 'LoryBlu';
export const appDescription = process.env.npm_package_description;
export const appVersion = process.env.npm_package_version;
export const appLicense = process.env.npm_package_license;

export const fullnameRegExp = /^[a-zÀ-ÿ ]+$/i;
export const recoveryTokenRegExp = /^[a-zA-Z0-9_-]+$/;

export const isDevelopmentEnv = process.env.NODE_ENV === 'development';
export const isHomologationEnv = process.env.NODE_ENV === 'homologation';
export const isProductionEnv = process.env.NODE_ENV === 'production';
