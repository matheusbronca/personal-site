interface ModalOptions {
  selector?: string;
  backdropClass?: string;
  onClickOutside?: (event: MouseEvent) => void;
  onEscape?: (event: KeyboardEvent) => void;
}

/**
 * Action to display node as a modal view
 */
export function modal(node: HTMLElement, options?: ModalOptions) {
  const { selector, backdropClass, onClickOutside, onEscape } = options || {};

  const onClick = (e: MouseEvent) => {
    if (e.target === e.currentTarget) onClickOutside?.(e);
  };

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Escape") onEscape?.(e);
  };

  let modalParent;
  if (selector) {
    const query = document.querySelector(selector);
    if (query) modalParent = query;
    else
      throw new Error(`No existing node that matches selector "${selector}"`);
  } else {
    modalParent = document.body;
  }

  const backdrop = document.createElement("div");
  if (backdropClass) {
    const classes = backdropClass.split(" ");
    classes.forEach((className) => backdrop.classList.add(className));
  }
  if (onClickOutside) backdrop.addEventListener("click", onClick);
  if (onEscape) window.addEventListener("keydown", onKeyDown);

  const html = document.querySelector("html");

  if (html) html.style.overflow = "hidden";
  backdrop.append(node);
  modalParent.append(backdrop);

  return {
    destroy() {
      backdrop.remove();
      window.removeEventListener("keydown", onKeyDown);
      if (html) html.style.overflow = "auto";
    },
  };
}
