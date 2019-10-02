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
              id: uuid(),
              title: 'ToDo Item 1',
              isDone: false,
            },
            {
              id: uuid(),
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
              id : uuid(),
              title: 'ToDo Item 1',
              isDone: true,
            },
            {
              id: uuid(),
              title: 'ToDo Item 2',
              isDone: true,
            }
          ]
        },
      ]
    }

    this.handleAddNewList = this.handleAddNewList.bind(this);
    this.handleAddNewItemToList = this.handleAddNewItemToList.bind(this);
    this.handleUpdateItemOnList = this.handleUpdateItemOnList.bind(this);
    this.handleDeleteListItem = this.handleDeleteListItem.bind(this);
  }

  handleAddNewList(newListTitle) {
    if (!newListTitle) {
      return;
    }

     let listsWithNewList = [...this.state.lists]

     const newList = {
       id: uuid(),
       title: newListTitle,
       items: []
     }

     listsWithNewList.push(newList);
     this.setState({lists: listsWithNewList});
  }

  handleAddNewItemToList(listId, newItemText) {
    console.log("Adding new item with text '" + newItemText + "' to list with ID '" + listId + "'")

    if(!newItemText) {
      return;
    }

    const updatedTodoListList = this.state.lists.map((list) => {
      if (list.id === listId) {
        const items = [...list.items]
        items.push({
            id: uuid(),
            title: newItemText,
            isDone: false
        });
        list.items = items;
      }
        return list;
    });

    this.setState({lists: updatedTodoListList});
  }

  handleUpdateItemOnList(listId, itemId, itemText, isDone) {
    console.log(`Updating item with id ${itemId} in list with id ${listId}... Setting text to ${itemText} and isDone is ${isDone}`)
    
    const updatedTodoListList = this.state.lists.map((list) => 
    {
      if (list.id === listId) {
        const updatedListItems = list.items.map((item) => {
          if (item.id === itemId) {

            // I know those if's are very dirty, but this is my first
            // React App, that I purpusefully hacked together, just
            // to get a raw taste of the framework
            if (itemText) {
              console.log(`\tchanging item's text to ${itemText}`)
              item.title = itemText;
            }
            
            if ((isDone !== null) && (isDone !== undefined)) {
              console.log(`\tchanging item's isDone status to ${isDone}`)
              item.isDone = isDone;
            }
          }
            return item;
        })
        list.items = updatedListItems;
      } 
        return list;
    });

    this.setState({lists: updatedTodoListList});
  }

  handleDeleteListItem(listId, itemId) {
    console.log(`Deleting item with id ${itemId} from list with id ${listId}`)
    const updatedTodoListList = this.state.lists.map((list) => {
      if (list.id === listId) {
        const updatedListItems = list.items.filter((item) => {
          if (item.id === itemId) {
            return false;
          }
          return true;
        });
        list.items = updatedListItems;
      }
      return list;
    });

    this.setState(updatedTodoListList);
  }

  render() {
    console.log(this.state.lists)
    return (
      <TodoListHolder 
        lists={this.state.lists}
        onAddNewList={this.handleAddNewList}
        onAddNewItemToList={this.handleAddNewItemToList}
        onUpdateItemOnList={this.handleUpdateItemOnList}
        onDeleteListItem={this.handleDeleteListItem}
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
        onAddNewItemToList={this.props.onAddNewItemToList}
        onUpdateItemOnList={this.props.onUpdateItemOnList}
        onDeleteListItem={this.props.onDeleteListItem}
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
        listId={this.props.id}
        itemId={item.id}
        title={item.title}
        isDone={item.isDone}
        onUpdateItemOnList={this.props.onUpdateItemOnList}
        onAddNewItemToList={this.props.onAddNewItemToList}
        onDeleteListItem={this.props.onDeleteListItem}
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
        <ToggleableNewTodoListItem
          listId={this.props.id}
          onAddNewItemToList={this.props.onAddNewItemToList}
        />
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

    this.handleEditListItemClick = this.handleEditListItemClick.bind(this);
    this.handleUpdateItemOnList = this.handleUpdateItemOnList.bind(this);
  }

  handleEditListItemClick() {
    this.setState({isEditing: true});
  }

  handleUpdateItemOnList(listId, itemId, itemText) {
    this.props.onUpdateItemOnList(listId, itemId, itemText)
    this.setState({isEditing: false});
  }

  render() {
    if (this.state.isEditing) {
      return (
        <EditingTodoListItem
          listId={this.props.listId}
          itemId={this.props.itemId}
          title={this.props.title}
          showDelete={true}
          onUpdateItemOnList={this.handleUpdateItemOnList}
          onAddNewItemToList={this.props.onAddNewItemToList}
        />
      );
    } else {
      return (
        <PlainTodoListItem
          listId={this.props.listId}
          itemId={this.props.itemId}
          title={this.props.title}
          isDone={this.props.isDone}
          onEditListItemClick={this.handleEditListItemClick}
          onDeleteListItem={this.props.onDeleteListItem}
          onUpdateItemOnList={this.props.onUpdateItemOnList}
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

    this.toggleAddItemButton = this.toggleAddItemButton.bind(this);
    this.handleAddNewItemToList = this.handleAddNewItemToList.bind(this);
  }

  handleAddNewItemToList(listId, itemText) {
    this.toggleAddItemButton()
    this.props.onAddNewItemToList(listId, itemText)
  }

  toggleAddItemButton() {
    this.setState({isOpen: !this.state.isOpen})
  }

  render() {
    if (this.state.isOpen) {
      return (
        <EditingTodoListItem
          listId={this.props.listId} 
          showDelete={false}
          onAddNewItemToList={this.handleAddNewItemToList}
        />
      )
    } else {
      return(
        <button className="positive ui button" onClick={this.toggleAddItemButton}>
          <i className="plus square icon"></i>
        </button>
      );
    }
  }
}

class EditingTodoListItem extends React.Component {
  constructor(props) {
    super(props);

    this._handleKeyDown = this._handleKeyDown.bind(this);
  }

  _handleKeyDown(e) {
    if (e.key === 'Enter') {
      if (typeof this.props.itemId == 'undefined') {
        // itemId is not defined, so we're creating a new item
        this.props.onAddNewItemToList(this.props.listId, this.refs.itemTitle.value)
      } else {
        this.props.onUpdateItemOnList(this.props.listId, this.props.itemId, this.refs.itemTitle.value);
      }
    }
  }

  render() {
    return (
      <div className="ui input focus">
        <input type="text" ref="itemTitle" onKeyDown={this._handleKeyDown} defaultValue={this.props.title} />
      </div>
    );
  }
}

class PlainTodoListItem extends React.Component {
  constructor(props) {
    super(props);

    this.onDeleteListItemClick = this.onDeleteListItemClick.bind(this);
    this.onListItemClick = this.onListItemClick.bind(this);
  }

  onDeleteListItemClick() {
    console.log(`Trash icon clicked on item with id ${this.props.itemId}`)
    this.props.onDeleteListItem(this.props.listId, this.props.itemId);
  }

  onListItemClick() {
    this.props.onUpdateItemOnList(this.props.listId, this.props.itemId, null, !this.props.isDone);
  }

  render() {
    const titleText = this.props.isDone?<s>{this.props.title}</s>:this.props.title
    return (
      <div className="item">
        <span onClick={this.onListItemClick}>{titleText}</span>
        <span><i className="edit icon" style={{marginLeft: "5pt"}} onClick={this.props.onEditListItemClick}/> <i className="trash icon" onClick={this.onDeleteListItemClick}/></span>
      </div>
    );
  }
}

export default TodoListDashboard;
