import dotenv from 'dotenv';
dotenv.config();

/** @type {import('@remix-run/dev').AppConfig} */
export default {
  ignoredRouteFiles: ['**/.*'],
  serverBuildPath: 'build/index.js',
  serverModuleFormat: 'esm',
  future: {
    v7_relativeSplatPath: true,
    v2_routeConvention: true
  }
};