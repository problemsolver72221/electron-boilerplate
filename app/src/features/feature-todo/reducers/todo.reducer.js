export const initialState = {
    list: [],
    isOn: false,
}

/**
 * Actions
 */

export const SET_LIST = 'setList@todos'
export const SET_TOGGLE = 'setToggle@todos'

export const setList = (todos) => ({
    type: SET_LIST,
    payload: { todos },
})

export const toggleSomething = (val) => ({
    type: SET_TOGGLE,
    payload: { val },
})

/**
 * Handlers
 */

export const actionHandlers = {
    [SET_LIST]: (state, { payload }) => ({
        ...state,
        list: payload.todos,
    }),
    [SET_TOGGLE]: (state, { payload }) => ({
        ...state,
        // ...state.todos,
        isOn: payload.val,
    }),
}

export default (state = initialState, action) => {
    const handler = actionHandlers[action.type]
    return handler ? handler(state, action) : state
}
