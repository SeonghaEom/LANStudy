import { combineReducers } from 'redux';
import sampleReducer from './sampleReducer';
import questionList from './questionListReducer';
import question from './questionReducer';
import comments from './commentReducer';
import loginResult from './loginReducer';
import {firebaseReducer} from "react-redux-firebase";
import {firestoreReducer} from "redux-firestore";
// import firestore from '../config/fbconfig';
// import reducerName from 'reducerFilePath';

export default combineReducers({
    // reducerName   * make sure to import reducerFile
    firebase: firebaseReducer,
    firestore: firestoreReducer,
    questionList,
    question,
    comments,
    loginResult,
});