import React, { useCallback, useEffect, useReducer } from "react";
import axios from "axios";
import InstanceList from "./InstanceList";

const getAsyncInstanceList = async () => {
  return axios.get("/api/instances").then((response) => response.data);
};

const instanceListReducer = (state, action) => {
  switch (action.type) {
    case "INSTANCE_LIST_FETCH_INIT":
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case "INSTANCE_LIST_FETCH_SUCCESS":
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload,
      };
    case "INSTANCE_LIST_FETCH_FAILURE":
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    default:
      throw new Error();
  }
};

const App = () => {
  const [instanceList, dispatchInstanceList] = useReducer(instanceListReducer, {
    data: [],
    isLoading: false,
    isError: false,
  });

  const handleFetchInstanceList = useCallback(() => {
    dispatchInstanceList({ type: "INSTANCE_LIST_FETCH_INIT" });

    getAsyncInstanceList()
      .then((result) => {
        dispatchInstanceList({
          type: "INSTANCE_LIST_FETCH_SUCCESS",
          payload: result,
        });
      })
      .catch((error) => {
        dispatchInstanceList({ type: "INSTANCE_LIST_FETCH_FAILURE" });
      });
  }, []);

  useEffect(() => {
    handleFetchInstanceList();
  }, [handleFetchInstanceList]);

  return (
    <main>
      <h1>Instances</h1>
      <button onClick={handleFetchInstanceList}>Refresh</button>
      {instanceList.isLoading ? (
        <div>Loading...</div>
      ) : (
        <InstanceList items={instanceList.data} />
      )}
    </main>
  );
};

export default App;
