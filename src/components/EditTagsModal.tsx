import { Stack, Row, Col, Button, Form, Modal } from "react-bootstrap";
import { Tag } from "../types";

type Props = {
  availableTags: Tag[];
  show: boolean;
  handleClose: () => void;
  onUpdateTag: (id: string, label: string) => void;
  onDeleteTag: (id: string) => void;
};

export const EditTagsModal: React.FC<Props> = ({
  availableTags,
  show,
  handleClose,
  onUpdateTag,
  onDeleteTag,
}) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Tags</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Stack gap={2}>
            {availableTags.map((tag) => (
              <Row key={tag.id}>
                <Col>
                  <Form.Control
                    type="text"
                    defaultValue={tag.label}
                    onChange={(e) => onUpdateTag(tag.id, e.target.value)}
                  />
                </Col>
                <Col xs="auto" onClick={() => onDeleteTag(tag.id)}>
                  <Button variant="outline-danger">&times;</Button>
                </Col>
              </Row>
            ))}
          </Stack>
        </Form>
      </Modal.Body>
    </Modal>
  );
};
