import { Button, Modal, Spinner } from "react-bootstrap";
import { TrashFill } from "react-bootstrap-icons";

const DeleteModal = ({ title, body, show, onDelete, onCancel, loading }) => {
  return (
    <Modal show={show}>
      <Modal.Header>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{body}</Modal.Body>
      <Modal.Footer>
        <Button
          variant="secondary"
          className="d-flex align-items-center"
          onClick={onDelete}
          disabled={loading}
        >
          {loading ? (
            <Spinner as="span" animation="border" size="sm" />
          ) : (
            <TrashFill />
          )}
          <span className="ml-2">{loading ? "deleting..." : "delete"}</span>
        </Button>
        <Button onClick={onCancel}>Cancel</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteModal;
