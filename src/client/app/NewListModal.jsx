import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import MenuItem from 'material-ui/MenuItem';

/**
 * A modal dialog can only be closed by selecting one of the actions.
 */
class NewListModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      submit: true
    };

    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.enableSubmitButton = this.enableSubmitButton.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleEnterKeyPress = this.handleEnterKeyPress.bind(this);
  }

  handleOpen() {
    this.setState({open: true});
  }

  handleClose() {
    this.setState({open: false});
  }

  handleSubmit() {
    this.setState({open: false});
    this.props.newList(this.refs.newListName.getValue());
  }

  enableSubmitButton() {
    if (this.refs.newListName.getValue() === '') {
      this.setState({submit: true});
    } else {
      this.setState({submit: false});
    }
  }

  handleEnterKeyPress(e) {
    if (this.state.submit === false && e.key === 'Enter') {
      this.handleSubmit();
    }
  }

  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onClick={this.handleClose}
      />,
      <FlatButton
        label="Submit"
        primary={true}
        disabled={this.state.submit}
        onClick={this.handleSubmit}
      />,
    ];

    return (
      <div>
        <RaisedButton onClick={this.handleOpen} label="Create New List" className="create-wish-list-button"/>
        <Dialog
          title="Create new wish list"
          actions={actions}
          modal={true}
          open={this.state.open}
        >
          <TextField onChange={this.enableSubmitButton}
            onKeyPress={this.handleEnterKeyPress}
            ref="newListName"
            hintText="Enter wish list name"
            autoFocus />
        </Dialog>
      </div>
    );
  }
}

export default NewListModal;