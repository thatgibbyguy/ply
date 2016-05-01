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
      searching: false,
      searchValue: ''
    };
  },

  getSearchQuery(e) {
    const {dataQuery} = this.props;
    const searchQuery = e.target.value;
    const results = dataQuery(searchQuery);
    const self = this;

    this.setState({
      searching: true,
      searchValue: e.target.value
    });

    setTimeout(function(){
      self.setState({
        searching: false
      });
    }, 1000);

    if (searchQuery !== '' && searchQuery.length > 1) {
      this.setState({
        searchResults: results
      });
    }
    else {
      this.setState(this.getInitialState());
    }
  },

  clearSearchResults(){
    this.setState({
      searchResults: [],
      searching: false,
      searchValue: ''
    });
  },

  render() {
    const {placeholder} = this.props;
    const {searchResults, searching, searchValue} = this.state;
    const placeholderText = placeholder ? placeholder : 'Search...';
    const hideResultsContainer = searchResults.length > 0 || searching ? '' : 'hide';
    const hasResults = searchResults.length > 0 ? 'has-results' : '';
    const spinning = searching ? 'searching' : '';

    let inputClass = this.props.inputClass ? this.props.inputClass : '';

    if (hasResults) {
      inputClass = `${inputClass} active`
    }

    return(
      <div className="livesearch-container">
        <input type="search" 
               name="livesearch" 
               placeholder={placeholderText}
               onKeyUp={this.getSearchQuery}
               className={`${inputClass} ${hasResults}`} />
        <span className={`close ${hideResultsContainer} ${spinning}`} onClick={this.clearSearchResults}></span>
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
