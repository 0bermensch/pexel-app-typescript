import {createStore, applyMiddleware, combineReducers} from 'redux'
import thunk from 'redux-thunk';

import photoReducer from './reducers/photosReducer'

const rootReducer = combineReducers({
  photos: photoReducer
})


/*
applyMiddleware allows user to extend Redux with custom functionality
you can wrap the store's idspatch method for fun and profit. 
the key ture of middleware is that it is composable.
you can combine multiple middleware, and the order doesnt matter.

middleware is most commonly used to support asynchronous actions without boilderplate code or other dependency.

redux-thunk lets the action creators invert control by dispatching functions.
They would receive dispatch as an argument and may call it asynchronously
*/
const store = createStore(
  rootReducer,
  applyMiddleware(thunk)
)


//RootState are all the states from the combined reducers
export type RootState = ReturnType<typeof rootReducer>;

export default store;