import React, { Component } from 'react';
import axios from 'axios';
import { Modal, ModalBody } from 'react-modal-bootstrap';
import ProductDetails from './ProductDetails.jsx';

class SearchResultsEntry extends Component {
  constructor(props) {
    super(props);
    this.handleAddItem = this.handleAddItem.bind(this)
    this.state = {
      showDetails: false,
      details: {}
    };
    this.handleAddItem = this.handleAddItem.bind(this);
    this.handleItemClick = this.handleItemClick.bind(this);
  }

  handleAddItem(e) {
    e.preventDefault();
    var item = this.props.item
    this.props.addToList(item)
    // TODO: add item to current list in memory
  }

  handleItemClick() {
    this.setState({
      showDetails: !this.state.showDetails
    });
  }

  render() {
    const { item } = this.props;

    return(
      <div className="list row">
        <Modal
          isOpen={this.state.showDetails}
          onRequestHide={this.handleItemClick}
        >
          <ModalBody>
            <ProductDetails itemId={item.itemId} itemUrl={item.url} addToList={this.props.addToList}/>
          </ModalBody>
        </Modal>
        <div className="col-sm-3 item-title">
          <a className="btn btn-link" onClick={this.handleItemClick}><strong>{item.name.substring(0, 40)}</strong></a>
        </div>
        <div className="col-sm-3 item-image">
          <img src={item.image} alt=""/>
        </div>
        <div className="col-sm-2 item-price">
          ${item.price}
        </div>
        <div className="col-sm-2">
          <a className="btn btn-default" onClick={this.handleAddItem}>Add to List</a>
        </div>
        <div className="col-sm-2">
          <a href={item.url} target="_blank" className="btn btn-primary">Buy it Now!</a>
        </div>
      </div>
    );
  }
}

export default SearchResultsEntry;
