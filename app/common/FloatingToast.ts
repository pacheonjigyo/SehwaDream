import { sleep } from "./Functions.js";

export async function floatingToast(
  message: string,
  type: string,
  isDesktop: boolean,
) {
  const toast: HTMLDivElement = document.createElement("div");
  const toastContainer: HTMLElement | null =
    document.getElementById("toastContainer");

  if (!toastContainer) {
    return;
  }

  toastContainer.className = `toast-container ${
    isDesktop ? "desktop" : "mobile"
  }`;

  toast.className = `toast ${type}`;
  toast.innerHTML = `
      <div style="display: flex; align-items: center;">
          ${message}
      </div>
  `;

  toastContainer.appendChild(toast);

  await sleep(1000 * 3);

  toast.style.setProperty("-webkit-animation", "fade-out 1s");
  toast.style.setProperty("animation", "fade-out 1s");

  await sleep(1000 * 0.8);

  toast.remove();
}
