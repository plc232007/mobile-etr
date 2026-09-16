import AsyncStorage from "@react-native-async-storage/async-storage";
import { initialData } from "@/mocks/data";
import { AppData } from "@/types";
export interface CitizenRepository {
  load(): Promise<AppData>;
  save(data: AppData): Promise<void>;
  reset(): Promise<AppData>;
}
const DATA_KEY = "etr:demo:v1";
const SESSION_KEY = "etr:session:v1";
let queue: Promise<void> = Promise.resolve();
export const repository: CitizenRepository = {
  async load() {
    await new Promise((resolve) => setTimeout(resolve, 350));
    const stored = await AsyncStorage.getItem(DATA_KEY);
    if (!stored) return JSON.parse(JSON.stringify(initialData)) as AppData;
    const parsed = JSON.parse(stored) as AppData;
    if (!parsed.user || !Array.isArray(parsed.processes) || !parsed.preferences)
      throw new Error("Não foi possível ler os dados salvos.");
    return parsed;
  },
  save(data) {
    const snapshot = JSON.stringify(data);
    queue = queue
      .catch(() => undefined)
      .then(() => AsyncStorage.setItem(DATA_KEY, snapshot));
    return queue;
  },
  async reset() {
    const data = JSON.parse(JSON.stringify(initialData)) as AppData;
    await this.save(data);
    return data;
  },
};
export const session = {
  async load() {
    return (await AsyncStorage.getItem(SESSION_KEY)) === "active";
  },
  async save(active: boolean) {
    await AsyncStorage.setItem(SESSION_KEY, active ? "active" : "inactive");
  },
};
