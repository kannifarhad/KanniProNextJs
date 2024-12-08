import getConfig from "next/config";
const config = getConfig();

export const API_BASE_URL = config?.publicRuntimeConfig.API_BASE_URL;
