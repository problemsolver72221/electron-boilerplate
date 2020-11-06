const Store = require('electron-store');

// set the schema of json db:

const schema = {
    todos: {
        type: 'array',
        properties: {
            todo_id: { type: 'string' },
            description: { type: 'string' },
        },
        name: 'hello'
        // maximum: 100,
        // minimum: 1,
        // default: 50
    }
}
 
const store = new Store({ schema });
 
// store.set('unicorn', '🦄');
// console.log(store.get('unicorn'));
// //=> '🦄'

export const setJSON = (key, value) => {
    // Use dot-notation to access nested properties: store.set('foo.bar', true);
    return store.set(key, value)
}

export const getJSON = (key) => {
    return store.get(key)
}

export const deleteJSON = (key) => {
    return store.delete(key)
}

export const getFileLocation = () => {
    return store.path
}

// // Use dot-notation to access nested properties
// store.set('foo.bar', true);
// console.log(store.get('foo'));
// //=> {bar: true}
 
// store.delete('unicorn');
// console.log(store.get('unicorn'));
// //=> undefined
