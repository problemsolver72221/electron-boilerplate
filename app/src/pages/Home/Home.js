import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import {
    getTodos,
    addTodo,
    updateTodo,
    deleteTodo,
} from '../../features/feature-todo/services/todo.service'

import TodoPageUI from './components/TodoPageUI'

const mapState = ({ todos }) => ({
    list: todos.list,
})

const mapDispatch = (dispatch) => ({
    getTodos: () => dispatch(getTodos()),
    addTodo: (todo) => dispatch(addTodo(todo)),
    updateTodo: (todoId, newVal) => dispatch(updateTodo(todoId, newVal)),
    deleteTodo: (todoId) => dispatch(deleteTodo(todoId)),
    // openTodo: todoId => dispatch({
    //     type: '@open::todos::todo-page',
    //     todoId: todoId,
    // }),
})

class Home extends Component {
    async componentDidMount() {
        try {
            const { getTodos } = this.props
            this.setState({ isLoading: true })
            await getTodos()
            this.setState({
                isLoading: false,
            })
        } catch (err) {
            this.setState({ isLoading: false })
        }
    }

    state = {
        isLoading: false,
    }

    render() {
        const { list, addTodo, updateTodo, deleteTodo } = this.props
        return (
            <div style={{ padding: 15 }}>
                <h2>Todo list</h2>
                <TodoPageUI
                    list={list}
                    onOpen={() => console.log('hi')}
                    onAddTodo={addTodo}
                    onUpdateTodo={updateTodo}
                    onDeleteTodo={deleteTodo}
                />
            </div>
        )
    }
}

Home.propTypes = {
    list: PropTypes.array,
    getTodos: PropTypes.func.isRequired,
}

// export default Home
export default connect(mapState, mapDispatch)(Home)
