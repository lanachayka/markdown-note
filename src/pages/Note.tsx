import { useNote } from "../hooks";
import { Stack, Row, Col, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import { TagsList } from "../components";

type Props = {
  onDelete: (id: string) => void;
};

export const Note: React.FC<Props> = ({ onDelete }) => {
  const { title, tags, id, markdown } = useNote();
  const navigate = useNavigate();
  return (
    <>
      <Row className="align-items-center mb-4">
        <Col>
          <h1>{title}</h1>
          <TagsList tags={tags} />
        </Col>
        <Col xs="auto">
          <Stack gap={2} direction="horizontal">
            <Link to={`/markdown-note/${id}/edit`}>
              <Button type="button" variant="primary">
                Edit
              </Button>
            </Link>
            <Button
              type="button"
              variant="outline-danger"
              onClick={() => {
                onDelete(id);
                navigate("/");
              }}
            >
              Delete
            </Button>
            <Link to="/markdown-note">
              <Button type="button" variant="outline-secondary">
                Back
              </Button>
            </Link>
          </Stack>
        </Col>
      </Row>
      <ReactMarkdown>{markdown}</ReactMarkdown>
    </>
  );
};
