import { useEffect, useState } from "react";
import { useSafeAreaInsets as useNativeInsets } from "react-native-safe-area-context";
import { Platform } from "react-native";

export function useCrossSafeAreaInsets() {
  const nativeInsets = useNativeInsets();
  const [webInsets, setWebInsets] = useState({ top: 0, right: 0, bottom: 0, left: 0 });

  useEffect(() => {
    if (Platform.OS === "web") {
      const getInset = (variable: string) => {
        const value = getComputedStyle(document.documentElement).getPropertyValue(variable);
        return value ? parseInt(value, 10) : 0;
      };

      const update = () => {
        setWebInsets({
          top: getInset("env(safe-area-inset-top)"),
          right: getInset("env(safe-area-inset-right)"),
          bottom: getInset("env(safe-area-inset-bottom)"),
          left: getInset("env(safe-area-inset-left)"),
        });
      };

      update();
      window.addEventListener("resize", update);
      return () => window.removeEventListener("resize", update);
    }
  }, []);

  return Platform.OS === "web" ? webInsets : nativeInsets;
}
