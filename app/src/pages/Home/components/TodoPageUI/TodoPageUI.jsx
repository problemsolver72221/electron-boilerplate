import React from 'react'
import PropTypes from 'prop-types'

import TodoListUI from '../TodoListUI'
import AddTodo from '../../../../components/AddTodo'
import UpdateTodo from '../../../../components/UpdateTodo'
import Modal from '../../../../components/Modal'

import { randomIdGenerator } from '../../../../lib/numbers'

import getStyles from './TodoPageUI.style'
const styles = getStyles()

class TodoPageUI extends React.PureComponent {
    state = {
        list: [],
        inputValue: '',
        errorMsg: null,
        // edit related
        editModal: false,
        editTodoId: null,
        editInputValue: '',
        editErrorMsg: null,
    }

    handleInput = (e) => {
        this.setState({ inputValue: e.target.value, errorMsg: null })
    }

    handleEditInput = (e) => {
        this.setState({ editInputValue: e.target.value, editErrorMsg: null })
    }

    handleAdd = (val) => {
        const { onAddTodo } = this.props
        // const { list } = this.state

        if (val.length === 0) return this.setState({ errorMsg: 'Please enter at least one character' })

        const todo = {
            todo_id: randomIdGenerator(),
            description: val,
        }

        onAddTodo(todo)

        // const newList = [...list, todo]
        // this.setState({ list: newList, inputValue: '' })
        this.setState({ inputValue: '' })
    }

    handleDelete = (todoId) => {
        console.log('delete this:', todoId)
        const { list } = this.state
        const newList = list.filter(item => item.todo_id !== todoId)
        this.setState({ list: newList })
    }

    handleEditModal = (todoId) => {
        const { list } = this.state
        const selectedTodo = list.filter(item => item.todo_id === todoId)
        this.setState({ editModal: true, editTodoId: todoId, editInputValue: selectedTodo[0].description })
        console.log(this.state)
    }

    handleTodoUpdate = (val) => {
        const { list, editTodoId } = this.state

        if (val.length === 0) return this.setState({ editErrorMsg: 'Please enter at least one character' })

        console.log(list, editTodoId)
        console.log('new val will be: ', val)

        // get the todoId.
        // map through the existing list.

        const newList = list.map(item => (item.todo_id === editTodoId) ? { ...item, description: val } : item)
        this.setState({ list: newList, editModal: false })
        // const todo = {
        //     todo_id: randomIdGenerator(),
        //     description: val,
        // }

        // const newList = [...list, todo]
        // this.setState({ list: newList, inputValue: '' })
    }

    render () {
        const { list, editModal, errorMsg, inputValue, editInputValue, editErrorMsg } = this.state
        const { data } = this.props
        return (
            <div style={styles.wrapper}>
                <Modal
                    isVisible={editModal}
                    onDismiss={() => this.setState({ editModal: false, editTodoId: null })}
                    height={200}
                    width={750}
                >
                    <div style={{ padding: 15, width: '100%', background: 'white' }}>
                        <p style={{
                            margin: 0,
                            padding: '0 15px',
                            fontSize: 18,
                            fontWeight: 500,
                        }}>Edit todo</p>
                        <UpdateTodo
                            onUpdate={(e) => this.handleTodoUpdate(e)}
                            onInputChange={(e) => this.handleEditInput(e)}
                            errorMsg={editErrorMsg}
                            inputValue={editInputValue}
                        />
                    </div>
                </Modal>
                <AddTodo
                    onAdd={(e) => this.handleAdd(e)}
                    onInputChange={(e) => this.handleInput(e)}
                    errorMsg={errorMsg}
                    inputValue={inputValue}
                />
                <div>
                    <h2>Todo list</h2>
                    <TodoListUI
                        // data={list}
                        data={data}
                        onOpen={(todoId) => console.log('open', todoId)}
                        onDelete={this.handleDelete}
                        onEdit={this.handleEditModal}
                    />
                </div>
            </div>
        )
    }
}

// const TodoPageUI = ({ title }) => (
//     <div style={styles.wrapper}>
//         <p>{title}</p>
//     </div>
// )

TodoPageUI.propTypes = {
    title: PropTypes.string,
}

TodoPageUI.defaultProps = {
    title: 'Hello world!',
}

export default TodoPageUI
