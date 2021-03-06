import React, { Component } from 'react';
import ListItem from './ListItem.jsx';
import ShoppingListEntry from './ShoppingListEntry.jsx';
import IconButton from 'material-ui/IconButton';
import AlertToRemoveList from './AlertToRemoveList.jsx';
import WishListIconMenu from './WishListIconMenu.jsx';
import EmailSnackBar from './EmailSnackBar.jsx';
import NewListModal from './NewListModal.jsx';
import WishListItemScroll from './WishListItemScroll.jsx';

export default class ShoppingList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      listName: '',
      currentList: this.props.list,
      renaming: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleName = this.handleName.bind(this);
    this.setName = this.setName.bind(this);
    this.changeName = this.changeName.bind(this);
    this.handleRename = this.handleRename.bind(this);
    this.cancelRename = this.cancelRename.bind(this);
    this.handleEnterKeyPress = this.handleEnterKeyPress.bind(this);
    this.moveCursorToEnd = this.moveCursorToEnd.bind(this);
  }

  handleChange(listName) {
    this.state.listName = listName;
    if (this.props.shoppingList[listName]) {
      this.state.currentList = this.props.shoppingList[listName];
    } else {
      this.state.currentList = [];
    }
    this.setState({ renaming: false });
  }

  handleName(name) {
    this.setState({ listName: name });
  }

  handleRename() {
    this.setState({ renaming: true });
  }

  cancelRename() {
    this.setState({ renaming: false });
  }

  setName() {
    var name = this.state.listName;
    this.props.handleNameChange(name);
    if (this.props.shoppingList[name]) {
      this.props.handleListChange(this.props.shoppingList[name]);
    } else {
      this.props.handleListChange([]);
    }
    this.setState({ renaming: false });
  }

  changeName(name) {
    this.props.handleRenameList(name);
    this.setState({ renaming: false });
  }

  handleEnterKeyPress(e) {
    if (e.key === 'Enter') {
      this.changeName(e.target.value);
    }
  }

  moveCursorToEnd(e) {
    var temp = e.target.value;
    e.target.value = '';
    e.target.value = temp;
  }

  render() {
    const { list } = this.props;
    if (this.props.myList || this.props.list) {
      return (
        <div >
          {
            (this.state.renaming)
              ?
              <h3>
                <input size="18" className="wish-list wish-list-edit" autoFocus onFocus={this.moveCursorToEnd} onBlur={(e) => this.changeName(e.target.value)} className="wish-list-edit" onChange={(e) => this.handleName(e.target.value)} type="text" defaultValue={this.props.currentListName} onKeyPress={this.handleEnterKeyPress} />
                <WishListIconMenu className="wish-list" removeList={this.props.removeList} newList={this.props.newList} myList={this.props.myList} handleChange={this.handleChange} setName={this.setName}/>
              </h3>
              :
              <div>
                <h3 className="wish-list wish-list-name" onClick={this.handleRename}>
                  {this.props.currentListName}
                </h3>
                <WishListIconMenu removeList={this.props.removeList} newList={this.props.newList} myList={this.props.myList} handleChange={this.handleChange} setName={this.setName}/>
              </div>
          }
          <div className="container">
            <div className="row">
              <NewListModal newList={this.props.newList} />
              <EmailSnackBar sendList={this.props.sendList} />
            </div>
          </div>
          <WishListItemScroll shoppingList={this.props.list} removeItem={this.props.removeItem}/>
        </div>
      );
    }
    return (
      <div>There's nothing in your list yet!</div>
    );
  }
}
