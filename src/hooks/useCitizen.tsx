import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { AppData } from "@/types";
import { clearAttachments } from "@/services/attachmentStorage";
import { repository, session } from "@/services/repository";
interface CitizenContext {
  data: AppData | null;
  authenticated: boolean;
  loading: boolean;
  error: string;
  feedback: string;
  update: (transform: (data: AppData) => AppData) => void;
  notify: (message: string) => void;
  login: () => Promise<void>;
  logout: () => Promise<void>;
  reload: () => Promise<void>;
  reset: () => Promise<void>;
}
const Context = createContext<CitizenContext | null>(null);
export function CitizenProvider({ children }: React.PropsWithChildren) {
  const [data, setData] = useState<AppData | null>(null);
  const current = useRef<AppData | null>(null);
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [feedback, setFeedback] = useState("");
  const notify = useCallback((message: string) => setFeedback(message), []);
  useEffect(() => {
    if (feedback) {
      const timer = setTimeout(() => setFeedback(""), 4500);
      return () => clearTimeout(timer);
    }
  }, [feedback]);
  const reload = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const [next, active] = await Promise.all([
        repository.load(),
        session.load(),
      ]);
      current.current = next;
      setData(next);
      setAuthenticated(active);
    } catch {
      setError("Não conseguimos carregar seus dados. Tente novamente.");
    } finally {
      setLoading(false);
    }
  }, []);
  useEffect(() => {
    void reload();
  }, [reload]);
  const update = useCallback(
    (transform: (data: AppData) => AppData) => {
      if (!current.current) return;
      const next = transform(current.current);
      current.current = next;
      setData(next);
      void repository
        .save(next)
        .catch(() =>
          notify(
            "A alteração vale nesta sessão, mas não foi salva no aparelho.",
          ),
        );
    },
    [notify],
  );
  const login = async () => {
    try {
      await session.save(true);
      setAuthenticated(true);
    } catch {
      notify("Não foi possível iniciar a sessão. Tente novamente.");
    }
  };
  const logout = async () => {
    try {
      await session.save(false);
      setAuthenticated(false);
    } catch {
      notify("Não foi possível encerrar a sessão. Tente novamente.");
    }
  };
  const reset = async () => {
    setLoading(true);
    try {
      await clearAttachments();
      const next = await repository.reset();
      setAuthenticated(await session.load());
      current.current = next;
      setData(next);
      setError("");
      notify("Demonstração restaurada.");
    } catch {
      notify("Não foi possível restaurar os dados.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <Context.Provider
      value={{
        data,
        authenticated,
        loading,
        error,
        feedback,
        update,
        notify,
        login,
        logout,
        reload,
        reset,
      }}
    >
      {children}
    </Context.Provider>
  );
}
export function useCitizen() {
  const context = useContext(Context);
  if (!context) throw new Error("CitizenProvider ausente");
  return context;
}
export function useData() {
  const { data } = useCitizen();
  if (!data) throw new Error("Dados ainda não carregados");
  return data;
}
