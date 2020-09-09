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

export const getQuestionList = questionList => ({
    type: 'GET_QUESTION_LIST',
    questionList
})

export const updateQuestionList = questionList => ({
    type: 'UPDATE_QUESTION_LIST',
    questionList
})

export const getQuestion = question => ({
    type: 'GET_QUESTION',
    question
})