import { configureStore } from "@reduxjs/toolkit"
import litTextsReducer from './features/litTexts/litTextsSlice'
import showTextReducer from './features/litTexts/showTextSlice'
import usersReducer from './features/users/usersSlice'
import showUserReducer from './features/users/showUserSlice'

const store = configureStore({
  reducer: {
		litTexts: litTextsReducer,
		showText: showTextReducer,
		users: usersReducer,
		showUser: showUserReducer,

  },
})

export default store


// import { setupListeners } from '@reduxjs/toolkit/query'


	// window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
	// middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(litTextsApi.middleware),



// const composeEnhancers =
//   typeof window === 'object' &&
//   window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?   
//     window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
//     }) : compose;

// const enhancer = composeEnhancers(
//   applyMiddleware(...middleware),
// );