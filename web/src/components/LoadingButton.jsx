import { Fragment } from "react";
import { Button, Spinner } from "react-bootstrap";

const LoadingButton = ({
  loading,
  text,
  loadingText = "submitting...",
  ...props
}) => {
  return (
    <Button type="submit" disabled={loading} {...props}>
      {loading ? (
        <Fragment>
          <Spinner as="span" animation="border" size="sm" />
          <span className="ml-2">{loadingText}</span>
        </Fragment>
      ) : (
        text
      )}
    </Button>
  );
};

export default LoadingButton;
