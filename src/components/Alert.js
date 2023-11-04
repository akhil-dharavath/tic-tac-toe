import Alert from "react-bootstrap/Alert";

function AlertMessage({ message }) {
  return (
    <>
      <Alert
        variant="success"
        style={{
          position: "absolute",
          top: "0px",
          width: "100%",
          fontSize: "20px",
          fontWeight: "bold",
        }}
      >
        {message}
      </Alert>
    </>
  );
}

export default AlertMessage;
