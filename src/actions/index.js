import firestore from '../config/fbconfig';

async function get() {
  var rows= [];
  await firestore.collection('question').get()
    .then((snapshot)=>{
      // var rows= [];
      snapshot.forEach((doc) => {
        const question = doc.data();
        
        const id = doc.id;
        // question.id = id;
        // console.log({id : id, ...question});
        rows.push({id : id, ...question});
      })
    });

  return rows;
  }


export const actionName = actionParameter => ({
    type: 'ACTION_TYPE',
    actionParameter
})

export const updateHistory = history => ({
    type: 'UPDATE_HISTORY',
    history
})

export const updateStepNumber = step => ({
    type: 'UPDATE_STEP_NUMBER',
    step
})

export const updatePlayer = player => ({
    type: 'UPDATE_PLAYER',
    player
})

export const getQuestionList = questionList => {

  return (dispatch, getState) => {
    firestore.collection('question').get()
    .then((snapshot)=>{
      var rows= [];
      snapshot.forEach((doc) => {
        const question = doc.data();
        
        const id = doc.id;
        // question.id = id;
        // console.log({id : id, ...question});
        rows.push({id : id, ...question});
      })
      console.log(rows);
      questionList = rows;
      dispatch({type: 'GET_QUESTION_LIST', questionList})
    });
  }
}

// export const getQuestionList2 = () = ({
//   type: 'GET_QUESTION_LIST2',
// })

export const updateQuestionList = questionList => ({
    type: 'UPDATE_QUESTION_LIST',
    questionList
})

export const getQuestion = question => ({
    type: 'GET_QUESTION',
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
      })
      .then(() => {
        // callback 위 작업이 실행되면 어떤 작업을 할 것인지
        dispatch({ type: 'ADD_QUESTION', question });
      })
      .catch(err => {
        dispatch({ type: 'CREATE_PROJECT', err });
      });
  };
}