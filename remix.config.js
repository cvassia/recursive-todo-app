import dotenv from "dotenv";
dotenv.config();

/** @type {import('@remix-run/dev').AppConfig} */
export default {
  ignoredRouteFiles: ["**/.*"],
  serverModuleFormat: "esm",
  future: {
    v7_relativeSplatPath: true
  }
};
