import React from 'react';

export function Todo(props) {
  const { todo } = props;
  if(todo.isDone) {
    return <strike>{todo.text}</strike>;
  } else {
    return <span>{todo.text}</span>;
  }
}

export function TodoList(props) {
  const { todos, toggleTodo, addTodo } = props;

  const createTodo = (event) => {
    const input = event.target;
    const text = input.value;
    const isEnterKey = (event.which == 13);
    const isLongEnough = text.length > 0;

    if (isEnterKey && isLongEnough) {
      input.value = '';
      addTodo(text);
    }
  }

  const createHandleToggleTodo = (todoId) => {
    return (/* event -- FYI will be passed in here as this is the event handler fn, but we don't need it */) => {
      toggleTodo(todoId);
    };
  };

  // /* or */const createHandleToggleTodo = (todoId) => () => toggleTodo(todoId);
  // /* or */const createHandleToggleTodo = todoId => event => toggleTodo(todoId);

  // or instead of defining function here, define it below with <li>.
  // Then don't need to pass in `todoId` and have an extra function wrapper,
  // as the correct `todo` will already be in scope thanks to `.map()` closure.
  // <li onClick={() => toggleTodo(todo.get('id'))}

  return (
    <div className='todo'>
      <input type='text'
             placeholder='Add todo'
             className='todo_entry'
             onKeyDown={createTodo} />
      <ul className='todo__list'>
        {todos.map((todo) => (
          <li key={todo.get('id')}
              className='todo__item'
              onClick={createHandleToggleTodo(todo.get('id'))}>
            <Todo todo={todo.toJS()} />
          </li>
        ))}
      </ul>
    </div>
  );
}
