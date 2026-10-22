import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export const DEFAULT_ACCENT = "#c0613f";
export const UI_STORAGE_KEY = "playground-ui";

interface UiState {
  accent: string;
  muted: boolean;
  setAccent: (accent: string) => void;
  toggleMuted: () => void;
}

const applyAccent = (accent: string) => {
  if (typeof document !== "undefined") {
    document.documentElement.style.setProperty("--accent", accent);
  }
};

// localStorage can throw (private mode, blocked site data); preferences are a
// nicety, so a failing storage just means they don't persist.
const safeStorage = createJSONStorage(() => ({
  getItem: (name: string) => {
    try {
      return localStorage.getItem(name);
    } catch {
      return null;
    }
  },
  setItem: (name: string, value: string) => {
    try {
      localStorage.setItem(name, value);
    } catch {
      /* storage unavailable */
    }
  },
  removeItem: (name: string) => {
    try {
      localStorage.removeItem(name);
    } catch {
      /* storage unavailable */
    }
  },
}));

export const useUiStore = create<UiState>()(
  persist(
    (set) => ({
      accent: DEFAULT_ACCENT,
      muted: false,
      setAccent: (accent) => {
        applyAccent(accent);
        set({ accent });
      },
      toggleMuted: () => set((state) => ({ muted: !state.muted })),
    }),
    {
      name: UI_STORAGE_KEY,
      storage: safeStorage,
      partialize: ({ accent, muted }) => ({ accent, muted }),
      // Server HTML always renders defaults; rehydrating after mount keeps the
      // first client render identical to it (see UiHydrator).
      skipHydration: true,
      onRehydrateStorage: () => (state) => {
        if (state) applyAccent(state.accent);
      },
    },
  ),
);
