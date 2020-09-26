import { combineReducers } from 'redux';
import sampleReducer from './sampleReducer';
import history from './historyReducer';
import stepNumber from './stepNumberReducer';
import xIsNext from './playerReducer';
import questionList from './questionListReducer';
import question from './questionReducer';
import {firebaseReducer} from "react-redux-firebase";
import {firestoreReducer} from "redux-firestore";
// import firestore from '../config/fbconfig';
// import reducerName from 'reducerFilePath';

export default combineReducers({
    // reducerName   * make sure to import reducerFile
    firebase: firebaseReducer,
    firestore: firestoreReducer,
    history,
    stepNumber,
    xIsNext,
    questionList,
    question,
});