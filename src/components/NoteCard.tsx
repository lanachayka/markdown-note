import { SimplifiedNote } from "../types";
import { Stack, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { TagsList } from "./";

type Props = {
  note: SimplifiedNote;
};

export const NoteCard: React.FC<Props> = ({ note }) => {
  const { id, title, tags } = note;
  return (
    <Card
      as={Link}
      to={`/markdown-note/${id}`}
      className={"h-100 text-reset text-decoration-none card"}
    >
      <Card.Body>
        <Stack
          gap={2}
          className="align-items-center justify-content-center h-100"
        >
          <span className="fs-5">{title}</span>
          <TagsList tags={tags} stackClassName="justify-content-center" />
        </Stack>
      </Card.Body>
    </Card>
  );
};
