import React, { Component } from "react";
import { connect } from "react-redux";

// Actions
import * as actionCreators from "./store/actions";
import { Redirect } from "react-router-dom";

class BookForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      color: "",
      authors:[]
    };
    this.onTextChange = this.onTextChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onTextChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  onSubmit(event) {
    event.preventDefault();
    this.props.postBook(this.state, this.state.authors);
  }
  addAuthor = event => {
  this.setState({authors: [...event.target.selectedOptions].map(o => o.value)})
  }
  render() {
    if (!this.props.user) {
      
      return <Redirect to="/login"/>;
    }
    return (
      <form onSubmit={this.onSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Book Name"
          onChange={this.onTextChange}
        />
        <select name="color" onChange={this.onTextChange}>
          <option value="">Color</option>
          <option value="red">Red</option>
          <option value="blue">Blue</option>
          <option value="green">Green</option>
          <option value="yellow">Yellow</option>
          <option value="black">Black</option>
          <option value="white">White</option>
          <option value="grey">Grey</option>
          <option value="purple">Purple</option>
        </select><br/>
        <div className="form-group">
          <label htmlFor="exampleFormControlSelect2">select authors</label>
          <select multiple className="form-control" id="exampleFormControlSelect2" onChange={this.addAuthor}>
            {this.props.authors.map(author => <option key={author.id} value={author.id}> {author.first_name} {author.last_name}</option>)}
            
          </select>
        </div>
        <input type="submit" value="Add Book" />
      </form>
    );
  }
}

const mapStateToProps = state => {
  return {
    authors: state.rootAuthors.authors,
    author: state.rootAuthor.author,
    user: state.rootAuth.user,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    postBook: (book, author) =>
      dispatch(actionCreators.postBook(book, author))
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BookForm);
