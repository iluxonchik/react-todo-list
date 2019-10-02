import React from 'react';
import uuid from 'uuidv4'

class TodoListDashboard extends React.Component {
  constructor(props) {
    super(props);
    console.log('Constructor')
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

    this.handleAddNewList = this.handleAddNewList.bind(this);

  }

  handleAddNewList(newListTitle) {
     let listsWithNewList = [...this.state.lists]

     const newList = {
       id: uuid(),
       title: newListTitle,
       items: []
     }

     listsWithNewList.push(newList);
     this.setState({lists: listsWithNewList});
  }

  render() {
    console.log(this.state.lists)
    return (
      <TodoListHolder 
        lists={this.state.lists}
        onAddNewList={this.handleAddNewList}
       />
    );
  }
}

class TodoListHolder extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false
    }

    this.handleCreateNewList = this.handleCreateNewList.bind(this);
  }

  handleCreateNewList(newListTitle) {
    if(this.state.isOpen) {
      this.props.onAddNewList(newListTitle);
      this.setState({isOpen:false});
    } else {
      this.setState({isOpen:true});
    }
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
      <div className="content" syle={{margin: "22pt"}}>
        <div className="ui card">
          <div className="content">
            <div className="header">{this.props.title}
          </div>
        </div>
        <div className="ui list">
          {todoLists}
        </div>

        <ToggleableNewTodoList
          isOpen={this.state.isOpen}
          onCreateNewList={this.handleCreateNewList}
        />
      </div>
     </div>

    );
  }
}

class ToggleableNewTodoList extends React.Component {
  constructor(props) {
    super(props);

    this._handleKeyDown = this._handleKeyDown.bind(this);
  }

  _handleKeyDown(e) {
    if (e.key === 'Enter') {
      this.props.onCreateNewList(this.refs.listTitle.value)
    }
  }

  render() {
    if (!this.props.isOpen) {
      return (
        <div className="ui teal labeled icon button" onClick={this.props.onCreateNewList}>
          New List
          <i className="add icon"/>
        </div>
      );
    } else {
      return (
        <div className="iu input focus">
          <input type="text" placeholder="list title" ref="listTitle" onKeyDown={this._handleKeyDown}/>
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
    console.log(this.props.title);
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
      
      <div className="content" style={listStyle}>
        <div className="ui card">
          <div className="content">
            <div className="header">{this.props.title}
          </div>
        </div>
        <div className="ui list">
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
        <button className="positive ui button">
          <i className="plus square icon"></i>
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
    const deleteIcon = this.props.showDelete ? <i className="delete icon" /> : null
    return (
      <div className="ui input focus">
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
      <div className="item">
        {this.props.title}
        <i className="edit icon" style={{marginLeft: "5pt"}}></i>
      </div>
    );
  }
}

export default TodoListDashboard;
