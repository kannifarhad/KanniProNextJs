import getConfig from "next/config";
const config = getConfig();

export const API_BASE_URL = config?.publicRuntimeConfig?.NEXT_PUBLIC_API_URL || process.env?.NEXT_PUBLIC_API_URL;
