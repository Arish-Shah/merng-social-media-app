import { Form } from "react-bootstrap";

const InputField = ({
  type,
  label,
  placeholder,
  value,
  onChange,
  error,
  isTextArea,
  rows,
}) => {
  const as = isTextArea ? "textarea" : "input";

  return (
    <Form.Group>
      <Form.Label>{label}</Form.Label>
      <Form.Control
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        isInvalid={!!error}
        as={as}
        rows={rows}
        required
      />
      {error && (
        <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>
      )}
    </Form.Group>
  );
};

export default InputField;
