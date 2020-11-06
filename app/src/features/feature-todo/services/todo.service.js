// import { runQuery } from '@forrestjs/feature-network'
// import queries from './graphql'

import { setList, toggleSomething } from '../reducers/todo.reducer'

export const getTodos = () => async (dispatch) => {
    console.log('hi')
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
    console.log('val here', val)
    const { todos } = getState()
    // console.log('todos here!', todos)
    const newTodos = [...todos.list, val]
    // console.log('new ones', newTodos)
    dispatch(setList(newTodos))
}

export const updateTodo = (val) => async (dispatch, getState) => {
    console.log('val here', val)
    const { todos } = getState()
    // console.log('todos here!', todos)
    const newTodos = [...todos.list, val]
    // console.log('new ones', newTodos)
    dispatch(setList(newTodos))
}

export const toggleValue = (val) => async (dispatch) => {
    console.log('val here', val)
    dispatch(toggleSomething(val))
}

// export const deleteTodo = (todoId) => async (dispatch, getState) => {
//     const { todos } = getState()
//
// }
