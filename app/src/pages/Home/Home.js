import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { getTodos, addTodo, toggleValue } from '../../features/feature-todo/services/todo.service'

import TodoPageUI from './components/TodoPageUI'

const mapState = ({ todos }) => ({
    list: todos.list,
    isOn: todos.isOn,
})

const mapDispatch = (dispatch) => ({
    getTodos: () => dispatch(getTodos()),
    addTodo: (todo) => dispatch(addTodo(todo)),
    toggleValue: (val) => dispatch(toggleValue(val))
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
            const dos = await getTodos()
            console.log(dos)
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

    handleToggle = () => {
        const { isOn } = this.props
        this.props.toggleValue(!isOn)
    }

    render() {
        const { list, isOn, addTodo } = this.props
        console.log(list)
        return (
            <div style={{ padding: 15 }}>
                <h2>Todo list</h2>
                <TodoPageUI
                    data={list}
                    onOpen={() => console.log('hi')}
                    onAddTodo={addTodo}
                />
                <p>Toggle value: {isOn ? 'on' : 'off'}</p>
                <button onClick={this.handleToggle}>Toggle</button>
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
