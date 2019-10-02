import React from 'react';
import { graphql } from 'react-apollo';
import _ from 'lodash';
import { getAuthorsQuery, addBookMutation } from '../queries/queries';
class AddBook extends React.Component {
  state = {
    name: '',
    genre: '',
    authorId: ''
  }

  displayAuthors(){
    let { getAuthorsQuery } = this.props;
    if(getAuthorsQuery.loading){
      return <option disabled>Loading authors</option>
    } else {
      return getAuthorsQuery.authors.map(author => 
        <option key={author.id} value={author.id}>
          {author.name}
        </option>
      )
    }
  }

  submitForm(e){
    e.preventDefault();
    console.log(this.state);
  }
  
  render(){
    return(
      <form id='add-book' onSubmit={this.submitForm.bind(this)} >
        <div className='field'>
          <label>Book name:</label>
          <input type='text' onChange={e => this.setState({ name: e.target.value })} />
        </div>
        <div className='field'>
          <label>Genre:</label>
          <input type='text' onChange={e => this.setState({ genre: e.target.value })} />
        </div>
        <div className='field'>
          <label>Author:</label>
          <select onChange={e => this.setState({ authorId: e.target.value })} >
            <option>Select author</option>
            {this.displayAuthors()}
          </select>
        </div>
        <button>+</button>
      </form>
    )
  }
}

export default _.flowRight(
  graphql(getAuthorsQuery,{name: "getAuthorsQuery"}),
  graphql(addBookMutation,{name: "addBookMutation"})
)(AddBook);
