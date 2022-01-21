import React, { useCallback, useEffect, useReducer } from "react";
import axios from "axios";

const getAsyncDummyLoad = async () => {
  return axios
    .get("/api/flags/DUMMY_LOAD")
    .then((response) => response.data.isSet);
};

const dummyLoadReducer = (state, action) => {
  switch (action.type) {
    case "DUMMY_LOAD_FETCH_INIT":
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case "DUMMY_LOAD_FETCH_SUCCESS":
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload,
      };
    case "DUMMY_LOAD_FETCH_FAILURE":
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    case "DUMMY_LOAD_CHANGE":
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    default:
      throw new Error();
  }
};

const DummyLoadControl = () => {
  const [dummyLoad, dispatchDummyLoad] = useReducer(dummyLoadReducer, {
    data: false,
    isLoading: false,
    isError: false,
  });

  const handleFetchDummyLoad = useCallback(() => {
    dispatchDummyLoad({ type: "DUMMY_LOAD_FETCH_INIT" });

    getAsyncDummyLoad().then((result) => {
      dispatchDummyLoad({
        type: "DUMMY_LOAD_FETCH_SUCCESS",
        payload: result,
      }).catch((error) => {
        dispatchDummyLoad({ type: "DUMMY_LOAD_FETCH_FAILURE" });
      });
    });
  }, []);

  useEffect(() => {
    handleFetchDummyLoad();
  }, [handleFetchDummyLoad]);

  const handleDummyLoadSet = (newValue) => {
    dispatchDummyLoad({ type: "DUMMY_LOAD_CHANGE" });
    axios
      .put("/api/flags/DUMMY_LOAD", { value: newValue })
      .then(() => handleFetchDummyLoad())
      .catch(() => dispatchDummyLoad({ type: "DUMMY_LOAD_FETCH_FAILURE" }));
  };

  return (
    <>
      <p>
        {dummyLoad.isLoading ? (
          <span>Updating dummy load status...</span>
        ) : (
          <span>
            Dummy load started: {dummyLoad.data ? "yes" : "no"}{" "}
            {dummyLoad.data ? (
              <button onClick={() => handleDummyLoadSet(false)}>stop</button>
            ) : (
              <button onClick={() => handleDummyLoadSet(true)}>start</button>
            )}
          </span>
        )}
      </p>
      {dummyLoad.isError && (<p>An error occured while updating dummy load status!</p>)}
    </>
  );
};

export default DummyLoadControl;
