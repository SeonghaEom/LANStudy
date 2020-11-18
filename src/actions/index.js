import firestore from '../config/fbconfig';
import * as firebase from 'firebase';

async function get() {
  var rows= [];
  await firestore.collection('question').get()
    .then((snapshot)=>{
      // var rows= [];
      snapshot.forEach((doc) => {
        const question = doc.data();
        
        const id = doc.id;
        rows.push({id : id, ...question});
      })
    });

  return rows;
  }


export const actionName = actionParameter => ({
    type: 'ACTION_TYPE',
    actionParameter
})


export const getQuestionList = questionList => {
  questionList = questionList || 0;
  return (dispatch, getState) => {
    firestore.collection('question').get()
    .then((snapshot)=>{
      var rows= [];
      // console.log("snapshot ", snapshot );
      snapshot.forEach((doc) => {
        const question = doc.data();
        
        const id = doc.id;
        // question.id = id;
        console.log({id : id, ...question});
        question["createdAt"] = question["createdAt"].toDate();
        if (question["comments"]){
          question["comments"].forEach(comment => {
            comment["metadata"] = comment["metadata"].toDate();
          })
        }

        rows.push({id : id, ...question});
      })
      console.log(rows);
      questionList = rows;
      dispatch({type: 'GET_QUESTION_LIST', questionList})
    });
  }
}

export const filterQuestionList = (questionList, key) => ({
  type: 'FILTER_QUESTION_LIST',
  questionList,
  key
})

// export const getQuestionList2 = () = ({
//   type: 'GET_QUESTION_LIST2',
// })

export const updateQuestionList = (id, questionList, newQuestion) => ({
    type: 'UPDATE_QUESTION_LIST',
    id,
    questionList,
    newQuestion,
})

export const setQuestion = question => ({
    type: 'SET_QUESTION',
    question
})

export const addQuestion = question => {
  return (dispatch, getState) => {	//  { getFirebase, getFirestore } 제거
    // async call to database
    firestore	// 수정된 부분
      .collection('question')
      .add({
        ...question,
        // authorFirstName: 'Dan',
        // authorLastName: 'Jooo',
        // authorId: 12345,
        createdAt: new Date(),
        comments: new Array(),
      })
      .then(() => {
        // callback 위 작업이 실행되면 어떤 작업을 할 것인지
        dispatch({ type: 'ADD_QUESTION', question });
      })
      .catch(err => {
        dispatch({ type: 'ADD_QUESTION', err });
      });
  };
}

export const filterQuestion = (questionList, id) => ({
  type: 'FILTER_QUESTION',
  questionList,
  id
})

export const addComment = (question, author, comment) => {
  const metadata = firebase.firestore.Timestamp.fromDate(new Date());
  return (dispatch, getState) => {
    firestore
      .collection('question')
      .doc(question["id"])
      .update({
        comments: firebase.firestore.FieldValue.arrayUnion({
            author: author,
            metadata: metadata,
            comment: comment,
          })

      })
    .then(() => {
      console.log ("figuring out metada is ", metadata.toDate());
      const timestampToDate = metadata.toDate();
      dispatch({
        type: 'ADD_COMMENT',
        question,
        author,
        timestampToDate,
        comment
      })
    })
  }
}

export const getComments = (question) => {
  return (dispatch, getState) => {
    firestore
      .collection('question')
      .doc(question["id"])
      .get()
      .then((doc) => {
        // console.log("getComments ", doc.data());
        const comments = doc.data()["comments"]
        dispatch({
          type: 'GET_COMMENTS',
          comments,
      })
    })
  }
}

export const login = loginForm => {
  return (dispatch, getState) => {
    firebase.auth().signInWithEmailAndPassword(loginForm.id, loginForm.pw)
      .then(() => {
        var user = firebase.auth().currentUser;
        // console.log(user);
        dispatch( {type: 'LOGIN_SUCCESS',  user })
      })
      .catch(err => {
        dispatch ({ type: 'LOGIN_ERROR', err});
      });
  }
}
