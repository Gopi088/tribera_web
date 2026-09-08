const initialized = new WeakMap<ParentNode, Set<string>>();

export function byId(root: ParentNode, id: string): HTMLElement | null {
  return root.querySelector<HTMLElement>(`#${CSS.escape(id)}`);
}

// A missing widget can be mounted later; only claim roots where it exists.
export function claim(root: ParentNode, widget: string, selector: string): boolean {
  if (!root.querySelector(selector)) return false;
  let widgets = initialized.get(root);
  if (!widgets) {
    widgets = new Set();
    initialized.set(root, widgets);
  }
  if (widgets.has(widget)) return false;
  widgets.add(widget);
  return true;
}
