import { Fragment } from "react";
import { Button, Spinner } from "react-bootstrap";

const LoadingButton = ({ loading, text }) => {
  return (
    <Button type="submit" disabled={loading}>
      {loading ? (
        <Fragment>
          <Spinner as="span" animation="border" size="sm" />
          <span className="ml-2">Submitting...</span>
        </Fragment>
      ) : (
        text
      )}
    </Button>
  );
};

export default LoadingButton;
