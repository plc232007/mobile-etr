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
  setGeoEnabled: (enabled: boolean) => Promise<void>;
} | null>(null);
const key = "etr:prototype";

export function PrototypeProvider({ children }: React.PropsWithChildren) {
  const [model, setModel] = useState<Prototype>("original");
  const [ready, setReady] = useState(false);
  const [geoEnabled, setGeo] = useState(true);
  useEffect(() => {
    Promise.all([
      AsyncStorage.getItem(key),
      AsyncStorage.getItem("etr:geo-enabled"),
    ])
      .then(([value, geo]) => {
        setModel(
          value === "cliente" || value === "caminho" ? value : "original",
        );
        setGeo(geo !== "false");
      })
      .catch(() => undefined)
      .finally(() => setReady(true));
  }, []);
  const select = async (next: Prototype) => {
    await AsyncStorage.setItem(key, next);
    setModel(next);
  };
  const setGeoEnabled = async (enabled: boolean) => {
    await AsyncStorage.setItem("etr:geo-enabled", String(enabled));
    setGeo(enabled);
  };
  return (
    <Context.Provider value={{ model, select, geoEnabled, setGeoEnabled }}>
      {ready ? children : <LoadingState />}
    </Context.Provider>
  );
}

export function usePrototype() {
  const context = useContext(Context);
  if (!context) throw new Error("PrototypeProvider ausente");
  return context;
}
