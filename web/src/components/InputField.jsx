import { useEffect, useRef } from "react";
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
  autoFocus = false,
}) => {
  const as = isTextArea ? "textarea" : "input";

  const inputRef = useRef();

  useEffect(() => {
    if (autoFocus) {
      inputRef.current.focus();
    }
  }, [autoFocus]);

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
        ref={inputRef}
        required
      />
      {error && (
        <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>
      )}
    </Form.Group>
  );
};

export default InputField;
