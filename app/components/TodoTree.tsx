import React, { useState } from "react";
import { Form } from "@remix-run/react";
import { Trash2 } from "lucide-react";

import type { TodoNode } from "../utils/tree";
import {
  List,
  Row,
  Title,
  StatusButton,
  OpenSubTasksButton,
  DeleteButton,
  Button,
  InlineForm,
  Badge,
} from "./styles";

type Props = {
  nodes: TodoNode[];
};

function Item({ node, isMain = false }: { node: TodoNode; isMain?: boolean }) {
  const [open, setOpen] = useState(true);
  const [adding, setAdding] = useState(false);
  const [prevCount, setPrevCount] = useState(node.children.length);

  // clear input after submit
  React.useEffect(() => {
    if (adding && node.children.length > prevCount) {
      const timer = setTimeout(() => {
        setAdding(false);
        setPrevCount(node.children.length);
      }, 10);
      return () => clearTimeout(timer);
    }
  }, [node.children.length, adding, prevCount]);


  return (
    <List $isMain={isMain}>
      <Row>
        <Form method="post" replace>
          <input type="hidden" name="_action" value="toggle" />
          <input type="hidden" name="id" value={node.id} />
          <input
            type="hidden"
            name="completed"
            value={(!node.completed).toString()}
          />
          <StatusButton $completed={node.completed} aria-label="toggle complete">
            {node.completed ? "✓" : ""}
          </StatusButton>
        </Form>

        <Title $completed={node.completed}>{node.title}</Title>
        <Form method="post" replace>
          <input type="hidden" name="_action" value="delete" />
          <input type="hidden" name="id" value={node.id} />
          <DeleteButton aria-label="delete">
            <Trash2 />
          </DeleteButton>
        </Form>
        <InlineForm>
          <summary>
            <Badge onClick={() => setAdding(true)}>Add sub-task</Badge>
          </summary>
          {adding && (
            <Form
              method="post"
              replace
            >
              <input type="hidden" name="_action" value="add" />
              <input type="hidden" name="parentId" value={node.id} />
              <input
                name="title"
                type="text"
                placeholder="Sub-task title"
                required
              />
              <Button>Add</Button>
            </Form>
          )}
        </InlineForm>
        {node.children.length > 0 && (
          <OpenSubTasksButton onClick={() => setOpen((o) => !o)} aria-label="toggle open">
            {open ? "▼" : "▶"}
          </OpenSubTasksButton>
        )}
      </Row>
      {open && node.children.length > 0 && (
        <ul>
          {node.children.map((child) => (
            <Item key={child.id} node={child} />
          ))}
        </ul>
      )}
    </List>
  );
}

export default function TodoTree({ nodes }: Props) {
  return (
    <ul>
      {nodes.map((n) => (
        <Item key={n.id} node={n} isMain={true} />
      ))}
    </ul>
  );
}
