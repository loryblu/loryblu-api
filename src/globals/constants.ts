export const appName = 'LoryBlu';
export const appVersion = process.env.npm_package_version;
export const appLicense = process.env.npm_package_license;

export const fullnameRegExp = /^[a-zÀ-ÿ ]+$/i;
export const dataExampleISO8601 = 'YYYY-MM-DDTHH:mm:ss.sssZ';

export const isDevelopmentEnv = () => process.env.NODE_ENV === 'development';
export const isHomologationEnv = () => process.env.NODE_ENV === 'homologation';
export const isProductionEnv = () => process.env.NODE_ENV === 'production';
