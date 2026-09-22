import { useEffect } from "react";
import { Platform } from "react-native";

export function KeyboardFocus() {
  useEffect(() => {
    if (Platform.OS !== "web") return;
    const style = document.createElement("style");
    style.textContent = `
      [role="button"]:focus-visible, [role="tab"]:focus-visible,
      [role="menuitem"]:focus-visible, [role="switch"]:focus-visible,
      a:focus-visible, input:focus-visible, textarea:focus-visible {
        outline: 3px solid #315D7B !important;
        outline-offset: 3px;
      }
    `;
    document.head.appendChild(style);
    return () => style.remove();
  }, []);
  return null;
}
