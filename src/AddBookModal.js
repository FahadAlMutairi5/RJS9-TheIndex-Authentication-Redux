import React, { Component } from "react";

import BookForm from "./BookForm";
import Modal from "react-responsive-modal";


class AddBookModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
    this.onOpenModal = this.onOpenModal.bind(this);
    this.onCloseModal = this.onCloseModal.bind(this);
  }
  onOpenModal() {
    this.setState({ open: true });
  }

  onCloseModal() {
    this.setState({ open: false });
  }
  render() {
    const { open } = this.state;
    return (
      <div>
        <Modal open={open} onClose={this.onCloseModal} center>
          <BookForm authorID={this.props.authorID} />
        </Modal>
        <input type="button" onClick={this.onOpenModal} value="Add New Book!" />
      </div>
    );
  }
}

export default AddBookModal

