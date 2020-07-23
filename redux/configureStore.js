import { products } from "./reducers/products";
import { comments } from "./reducers/comments";
import { wishList } from "./reducers/wishList";
import { cart } from "./reducers/cart";
import { user } from './reducers/user';
import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";
import { AsyncStorage } from "react-native";
import { persistCombineReducers, persistStore } from "redux-persist";

function configureStore() {
  const config = {
    key: "root",
    storage: AsyncStorage,
    debug: true,
    timeout: null,
  };
  const store = createStore(
    persistCombineReducers(config, {
      products,
      comments,
      wishList,
      cart,
      user
    }),
    applyMiddleware(thunk, logger)
  );
  const persistor = persistStore(store);
  return { persistor, store };
}
export default configureStore;
