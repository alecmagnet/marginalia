import { configureStore } from "@reduxjs/toolkit";
import litTextsReducer from './features/litTexts/litTextsSlice'
// import { setupListeners } from '@reduxjs/toolkit/query'


const store = configureStore({
  reducer: {
		litTexts: litTextsReducer,
  },
	// window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
	// middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(litTextsApi.middleware),
});

export default store;


// const composeEnhancers =
//   typeof window === 'object' &&
//   window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?   
//     window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
//     }) : compose;

// const enhancer = composeEnhancers(
//   applyMiddleware(...middleware),
// );