import React from 'react';
import uuid from 'uuidv4'

class TodoListDashboard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      lists: [
        {
          id: uuid(),
          title: 'List 1',
          items: [
            {
              title: 'ToDo Item 1',
              isDone: false,
            },
            {
              title: 'ToDo Item 2',
              isDone: true,
            }
          ]
        },
        {
          id: uuid(),
          title: 'List 2',
          items: [
            {
              title: 'ToDo Item 1',
              isDone: true,
            },
            {
              title: 'ToDo Item 2',
              isDone: true,
            }
          ]
        },
      ]
    }
  }

  render() {
    return (
      <TodoListHolder 
        lists={this.state.lists}
       />
    );
  }
}

class TodoListHolder extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const todoLists = this.props.lists.map((list) => (
      <TodoList
        id={list.id}
        key={list.id}
        title={list.title}
        items={list.items}
      />
    ));
    return (
      <div>
        {todoLists}

        <ToggleableNewTodoList
          isOpen={false}
        />
      </div>
    );
  }
}

class ToggleableNewTodoList extends React.Component {
  constructor(props) {
    super(props);
    
  }

  render() {
    if (!this.props.isOpen) {
      return (
        <div class="ui teal labeled icon button">
          New List
          <i class="add icon" />
        </div>
      );
    } else {
      return (
        <div class="iu input focus">
          <input type="text" placeholder="new todo item text" />
        </div>
      )
    }
  }
}

class TodoList extends React.Component {
  constructor(props) {
    super(props);
  }

  render () {
    const listItems = this.props.items.map((item) => (
      <ToggleableTodoListItem
        title={item.title}
        isDone={item.isDone}
      />
    ));
    const listStyle = {
      marginBottom: '15pt' 
    }
    return (
      
      <div class="content" style={listStyle}>
        <div class="ui card">
          <div class="content">
            <div class="header">{this.props.title}
          </div>
        </div>
        <div class="ui list">
          {listItems}
        </div>
        <ToggleableNewTodoListItem />
      </div>
     </div>
    )
  }
}

class ToggleableTodoListItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isEditing: false
    }
  }

  render() {
    if (this.state.isEditing) {
      return (
        <EditingTodoListItem
          title={this.props.title}
          showDelete={true}
        />
      );
    } else {
      return (
        <PlainTodoListItem
          title={this.props.title}
          isDone={this.props.isDone}
        />
      );
    }
  }
}

class ToggleableNewTodoListItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false
    }
  }

  render() {
    if (this.state.isOpen) {
      return (
        <EditingTodoListItem 
          showDelete={false}
        />
      )
    } else {
      return(
        <button class="positive ui button">
          <i class="plus circle icon"></i>
        </button>
      );
    }
  }
}

class EditingTodoListItem extends React.Component {
  constructor(props) {
    super(props);

  }

  render() {
    const deleteIcon = this.props.showDelete ? <i class="delete icon" /> : null
    return (
      <div class="ui input focus">
        <input type="text" text={this.props.title} /> {deleteIcon}
      </div>
    );
  }
}

class PlainTodoListItem extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div class="item">
        {this.props.title}
        <i class="edit icon"></i>
      </div>
    );
  }
}

export default TodoListDashboard;
