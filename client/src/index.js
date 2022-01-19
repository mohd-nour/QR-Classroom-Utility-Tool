import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import reducers from "./reducers";
import {persistStore, persistReducer} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { PersistGate } from "redux-persist/integration/react";

const persistConfig = {
  key:'persist-state',
  storage
}

const persistedReducer = persistReducer(persistConfig, reducers);

const store = createStore(persistedReducer, compose(applyMiddleware(thunk)));

const persistor = persistStore(store);

ReactDOM.render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>,
  document.getElementById("root")
);

/*
<PersistGate persistor={persistor}>
      <App />
    </PersistGate>
*/