import { createContext, useContext, useEffect, useState } from "react";
import { Platform } from "react-native";
import { LoadingState } from "@/components/ui";
import { validatePrototypePassword } from "@/services/prototypeAuth";

const key = "etr:presentation-access:v1";
const Context = createContext<{
  granted: boolean;
  unlock: (password: string) => string;
  lock: () => void;
} | null>(null);

export function PresentationAccessProvider({
  children,
}: React.PropsWithChildren) {
  const [granted, setGranted] = useState(false);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    try {
      if (Platform.OS === "web") {
        setGranted(sessionStorage.getItem(key) === "true");
      }
    } catch {
      // If browser storage is unavailable, access lasts until the next reload.
    }
    setReady(true);
  }, []);
  const remember = (value: boolean) => {
    try {
      if (Platform.OS === "web") {
        if (value) sessionStorage.setItem(key, "true");
        else sessionStorage.removeItem(key);
      }
    } catch {
      // The in-memory session still works without browser storage.
    }
    setGranted(value);
  };
  const unlock = (password: string) => {
    const result = validatePrototypePassword(password);
    if (!result.valid) return result.message;
    remember(true);
    return "";
  };
  return (
    <Context.Provider value={{ granted, unlock, lock: () => remember(false) }}>
      {ready ? children : <LoadingState />}
    </Context.Provider>
  );
}

export function usePresentationAccess() {
  const context = useContext(Context);
  if (!context) throw new Error("PresentationAccessProvider ausente");
  return context;
}
