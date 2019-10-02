import React from 'react';
import { graphql } from 'react-apollo';
import { getAuthorsQuery } from '../queries/queries';
class AddBook extends React.Component {
  state = {
    name: '',
    genre: '',
    authorId: ''
  }

  displayAuthors(){
    let { data } = this.props;
    if(data.loading){
      return <option disabled>Loading authors</option>
    } else {
      return data.authors.map(author => 
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

export default graphql(getAuthorsQuery)(AddBook);
