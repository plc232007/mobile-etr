import React, { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LoadingState } from "@/components/ui";

export type Prototype = "original" | "cliente" | "caminho";
export const prototypeLabels: Record<Prototype, string> = {
  original: "01 · Tradicional",
  cliente: "02 · Central de Serviços",
  caminho: "03 · Minha ETR",
};
const Context = createContext<{
  model: Prototype;
  select: (model: Prototype) => Promise<void>;
  geoEnabled: boolean;
} | null>(null);
const key = "etr:prototype";

export function PrototypeProvider({ children }: React.PropsWithChildren) {
  const [model, setModel] = useState<Prototype>("original");
  const [ready, setReady] = useState(false);
  const geoEnabled = true;
  useEffect(() => {
    AsyncStorage.getItem(key)
      .then((value) => {
        setModel(
          value === "cliente" || value === "caminho" ? value : "original",
        );
      })
      .catch(() => undefined)
      .finally(() => setReady(true));
  }, []);
  const select = async (next: Prototype) => {
    await AsyncStorage.setItem(key, next);
    setModel(next);
  };
  return (
    <Context.Provider value={{ model, select, geoEnabled }}>
      {ready ? children : <LoadingState />}
    </Context.Provider>
  );
}

export function usePrototype() {
  const context = useContext(Context);
  if (!context) throw new Error("PrototypeProvider ausente");
  return context;
}
