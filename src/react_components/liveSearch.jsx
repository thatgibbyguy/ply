import React from 'react';

const liveSearch = React.createClass({
  propTypes: {
    placeholder: React.PropTypes.string,
    dataQuery: React.PropTypes.func,
    inputClass: React.PropTypes.string
  },

  getInitialState() {
    return {
      searchResults: [],
      searching: false
    };
  },

  getSearchQuery(e) {
    const {dataQuery} = this.props;
    const searchQuery = e.target.value;
    const results = dataQuery(searchQuery);
    const self = this;

    self.setState({
      searching: true
    });

    setTimeout(function(){
      self.setState({
        searching: false
      });
    },500)

    if (searchQuery !== '' && searchQuery.length > 1) {
      switch (results) {
        case null:
          this.setState({
            searching: true
          });
          break;

        case this.length === 0:
          this.setState({
            searchResults: ['no results']
          });
          break;

        default:
          this.setState({
            searchResults: results
          });
      }
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
    const activeClass = hasResults ? 'active' : '';


    let inputClass = this.props.inputClass ? this.props.inputClass : '';

    return(
      <div className={`livesearch-container ${activeClass}`}>
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
    if (result === 'no results') {
      return (
        <li key={ii} className="livesearch-results__result">
          <span>
            No results...
          </span>
        </li>
      );
    }
    else if (result.slug) {
      return (
        <li key={ii} className="livesearch-results__result">
          <a href={result.slug}>{result.title}</a>
        </li>
      );
    }
    else {
      return (
        <li key={ii} className="livesearch-results__result">
          {result.title}
        </li>
      );
    }
  }
});

module.exports = liveSearch;
