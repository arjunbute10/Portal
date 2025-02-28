// import { combineReducers, applyMiddleware, createStore, compose, Middleware} from 'redux';
// import { useSelector as _useSelector } from 'react-redux';

// // reducers
// import { contextReducer } from 'util/context';
// import thunkMiddleware from 'redux-thunk';

// // middleware
// // eslint-disable-next-line
// import reduceReducer from 'reduce-reducers';
// import { hydrateStateReducer, createUseStateFriendlyReducer } from 'util/redux';


// const appReducer = combineReducers({
//     context: contextReducer,
//     modalState: createUseStateFriendlyReducer("Modal")
// });

// const rootReducer = reduceReducer(appReducer, hydrateStateReducer) as typeof appReducer;

// declare global {
//     interface Window {
//         __REDUX_DEVTOOLS_EXTENSION__?: any;
//         ExagoApi: any;
//     }
// }

// const middleware : Middleware[] = [
//     thunkMiddleware
// ];


// const enhancers = [
//     applyMiddleware(...middleware)
// ];

// const store = createStore(
//     rootReducer,
//     compose(...enhancers)
// );

// export type RootStoreState = ReturnType<typeof store.getState>;

// export default store;

// // useSelector hook with state type pre-set to RootStoreState
// export function useSelector<TSelected>(
//     selector: (state: RootStoreState) => TSelected,
//     equalityFn?: (left: TSelected, right: TSelected) => boolean
// ): TSelected {
//     return _useSelector(selector, equalityFn);
// }