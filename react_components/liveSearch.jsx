import React from 'react';

export default React.createClass({
  propTypes: {
    placeholder: React.PropTypes.string,
    dataQuery: React.PropTypes.func,
    inputClass: React.PropTypes.string
  },

  getInitialState() {
    return {
      searchResults: [],
      searchStatus: null
    };
  },

  getSearchQuery(e) {
    const {dataQuery} = this.props;
    const searchQuery = e.target.value;
    const results = dataQuery(searchQuery);
    
    // self/this = this react class
    const self = this;

    if (searchQuery !== '' && searchQuery.length > 1) {
      self.setState({
        searchResults: results
      });
    }
    else {
      this.setState(this.getInitialState());
    }
  },

  render() {
    const {placeholder} = this.props;
    const {searchResults} = this.state;
    const placeholderText = placeholder ? placeholder : 'Search...';
    const hideResultsContainer = searchResults ? '' : 'hide';
    const inputClass = this.props.inputClass ? this.props.inputClass : '';
    const hasResults = searchResults.length > 0 ? 'has-results' : '';

    return(
      <div className="livesearch-container">
        <input type="search" 
               name="livesearch" 
               placeholder={placeholderText}
               onKeyUp={this.getSearchQuery}
               className={`${inputClass} ${hasResults}`} />
        <ul className={`livesearch-results fade-in ${hideResultsContainer}`}>
          {searchResults.map(this.renderResults)}
        </ul>
      </div>      
    );
  },

  renderResults(result, ii) {
    if (result.slug) {
      return(
        <li key={ii} className="livesearch-results__result">
          <a href={result.slug}>{result.title}</a>
        </li>
      )
    }
    else {
      return(
        <li key={ii} className="livesearch-results__result">
          {result.title}
        </li>
      )
    }
  }
});
