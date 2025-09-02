export type TodoNode = {
  id: string;
  title: string;
  completed: boolean;
  parentId: string | null;
  children: TodoNode[];
};

export function buildTree(docs: { $id: string; title: string; completed: boolean; parentId?: string | null; }[]): TodoNode[] {
  const map = new Map<string, TodoNode>();
  const roots: TodoNode[] = [];
  for (const d of docs) {
    map.set(d.$id, { id: d.$id, title: d.title, completed: d.completed, parentId: d.parentId ?? null, children: [] });
  }
  for (const n of map.values()) {
    if (n.parentId && map.has(n.parentId)) {
      map.get(n.parentId)!.children.push(n);
    } else {
      roots.push(n);
    }
  }
  return roots;
}
