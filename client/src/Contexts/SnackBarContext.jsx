import { useState, createContext, useCallback } from "react";

const SnackBarContext = createContext();

const SnackBarProvider = (props) => {
  const [message, setMessage] = useState(null);
  const [open, setOpen] = useState(false);

  const updateSnackBarMessage = useCallback((message) => {
    setMessage(message);
    setOpen(true);
    setTimeout(() => {
      setOpen(false);
    }, 10000);
  }, []);

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  const snackbarHandleClose = useCallback((event, reason) => {
    if (reason === "clickaway") return;
    setOpen(false);
  }, []);

  return (
    <SnackBarContext.Provider value={{ updateSnackBarMessage }}>
      {props.children}

      {open && (
        <div className="snack-bar-container  ">
          <div className="snack-bar rounded">
            <span>{message} </span>
            <button onClick={handleClose} className="btn btn-warning m-1">
              Close
            </button>
          </div>
        </div>
      )}
    </SnackBarContext.Provider>
  );
};

export { SnackBarContext, SnackBarProvider };
