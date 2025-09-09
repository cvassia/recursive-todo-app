import { describe, it, expect } from 'vitest';
import { buildTree } from './tree';

describe('buildTree', () => {
  it('builds a nested structure', () => {
    const docs = [
      { $id: '1', title: 'A', completed: false, parentId: null },
      { $id: '2', title: 'B', completed: false, parentId: '1' },
      { $id: '3', title: 'C', completed: false, parentId: '2' },
      { $id: '4', title: 'D', completed: false, parentId: null }
    ];
    const tree = buildTree(docs as any);
    expect(tree.length).toBe(2);
    const a = tree.find(n => n.id === '1')!;
    expect(a.children[0].children[0].title).toBe('C');
  });
});
