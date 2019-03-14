import React, { Component } from "react";
import { connect } from "react-redux";

// Actions
import * as actionCreators from "./store/actions";
import { Redirect } from "react-router-dom";

class AuthorForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      first_name: "",
      last_name: "",
      imageUrl: "",
      books: []
    };
    this.submitAuthor = this.submitAuthor.bind(this);
    this.onTextchange = this.onTextchange.bind(this);
  }

  submitAuthor(event) {
    event.preventDefault();
    this.props.postAuthor(this.state);
  }

  onTextchange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  render() {
    if (!this.props.user) {
      
      return <Redirect to="/login"/>;
    }
    return (
      <form onSubmit={this.submitAuthor}>
        <div className="input-group mb-3">
          <div className="input-group-prepend">
            <span className="input-group-text">First Name</span>
          </div>
          <input
            type="text"
            className="form-control"
            name="first_name"
            onChange={this.onTextchange}
          />
        </div>

        <div className="input-group mb-3">
          <div className="input-group-prepend">
            <span className="input-group-text">Last Name</span>
          </div>
          <input
            type="text"
            className="form-control"
            name="last_name"
            onChange={this.onTextchange}
          />
        </div>

        <div className="input-group mb-3">
          <div className="input-group-prepend">
            <span className="input-group-text">Image URL</span>
          </div>
          <input
            type="text"
            className="form-control"
            name="imageUrl"
            onChange={this.onTextchange}
          />
        </div>
        <input type="submit" />
      </form>
    );
  }
}
const mapStateToProps = state => {
  return {
    user: state.rootAuth.user,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    postAuthor: newAuthor => dispatch(actionCreators.postAuthor(newAuthor))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AuthorForm);
