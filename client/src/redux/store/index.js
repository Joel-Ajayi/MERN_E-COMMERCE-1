import {createStore, compose, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import combinedReducers from '../reducer'

const store=createStore(combinedReducers,
    compose(applyMiddleware(thunk),window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()));

export default store
