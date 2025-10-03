import { API_BASE_URL } from "@/constants/common";

export const getImagePath = (absoluteUrl: string) => {
  if (!API_BASE_URL || !absoluteUrl) return "";
  return `${API_BASE_URL}${absoluteUrl}`;
};

export function mergeRefs<T>(refs: Array<React.Ref<T> | undefined>): React.RefCallback<T> {
  return (value: T) => {
    refs.forEach((ref) => {
      if (typeof ref === "function") {
        ref(value);
      } else if (ref != null) {
        (ref as React.MutableRefObject<T | null>).current = value;
      }
    });
  };
}
