'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var liveSearch = _react2.default.createClass({
  displayName: 'liveSearch',

  propTypes: {
    placeholder: _react2.default.PropTypes.string,
    dataQuery: _react2.default.PropTypes.func,
    inputClass: _react2.default.PropTypes.string
  },

  getInitialState: function getInitialState() {
    return {
      searchResults: [],
      searching: false
    };
  },
  getSearchQuery: function getSearchQuery(e) {
    var dataQuery = this.props.dataQuery;

    var searchQuery = e.target.value;
    var results = dataQuery(searchQuery);
    var self = this;

    self.setState({
      searching: true
    });

    setTimeout(function () {
      self.setState({
        searching: false
      });
    }, 500);

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
  clearSearchResults: function clearSearchResults() {
    this.setState({
      searchResults: [],
      searching: false,
      searchValue: ''
    });
  },
  render: function render() {
    var placeholder = this.props.placeholder;
    var _state = this.state;
    var searchResults = _state.searchResults;
    var searching = _state.searching;
    var searchValue = _state.searchValue;

    var placeholderText = placeholder ? placeholder : 'Search...';
    var hideResultsContainer = searchResults.length > 0 || searching ? '' : 'hide';
    var hasResults = searchResults.length > 0 ? 'has-results' : '';
    var spinning = searching ? 'searching' : '';
    var activeClass = hasResults ? 'active' : '';

    var inputClass = this.props.inputClass ? this.props.inputClass : '';

    return _react2.default.createElement(
      'div',
      { className: 'livesearch-container ' + activeClass },
      _react2.default.createElement('input', { type: 'search',
        name: 'livesearch',
        placeholder: placeholderText,
        onKeyUp: this.getSearchQuery,
        className: inputClass + ' ' + hasResults }),
      _react2.default.createElement('span', { className: 'close ' + hideResultsContainer + ' ' + spinning, onClick: this.clearSearchResults }),
      _react2.default.createElement(
        'ul',
        { className: 'livesearch-results fade-in ' + hideResultsContainer },
        searchResults.map(this.renderResults)
      )
    );
  },
  renderResults: function renderResults(result, ii) {
    if (result === 'no results') {
      return _react2.default.createElement(
        'li',
        { key: ii, className: 'livesearch-results__result' },
        _react2.default.createElement(
          'span',
          null,
          'No results...'
        )
      );
    } else if (result.slug) {
      return _react2.default.createElement(
        'li',
        { key: ii, className: 'livesearch-results__result' },
        _react2.default.createElement(
          'a',
          { href: result.slug },
          result.title
        )
      );
    } else {
      return _react2.default.createElement(
        'li',
        { key: ii, className: 'livesearch-results__result' },
        result.title
      );
    }
  }
});

module.exports = liveSearch;