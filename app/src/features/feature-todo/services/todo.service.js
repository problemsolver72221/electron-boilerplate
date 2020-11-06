// import { runQuery } from '@forrestjs/feature-network'
// import queries from './graphql'

import { setList } from '../reducers/todo.reducer'

export const getTodos = () => async (dispatch) => {
    // const res = await dispatch(runQuery(queries.getTodos))
    // console.log('res?', res)
    const todos = [
        {
            todo_id: 1,
            description: 'Brush teeth',
        },
        {
            todo_id: 2,
            description: 'Drink coffee',
        },
        {
            todo_id: 3,
            description: 'Take a break',
        },
    ]
    dispatch(setList(todos))
}

export const addTodo = (val) => async (dispatch, getState) => {
    const { todos } = getState()
    const newTodos = [...todos.list, val]
    dispatch(setList(newTodos))
}

export const updateTodo = (todoId, newVal) => async (dispatch, getState) => {
    const { todos } = getState()

    const newTodos = todos.list.map(item =>
        (item.todo_id === todoId)
            ? { ...item, description: newVal }
            : item
    )

    dispatch(setList(newTodos))
}

export const deleteTodo = (todoId) => async (dispatch, getState) => {
    const { todos } = getState()
    const newTodos = todos.list.filter(item => item.todo_id !== todoId)
    dispatch(setList(newTodos))
}

// export const deleteTodo = (todoId) => async (dispatch, getState) => {
//     const { todos } = getState()
//
// }
