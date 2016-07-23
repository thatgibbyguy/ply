'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var types = ['button', 'reset', 'span', 'submit'];

var button = _react2.default.createClass({
  displayName: 'button',


  propTypes: {
    type: _react2.default.PropTypes.oneOf(types),
    buttonText: _react2.default.PropTypes.string,
    active: _react2.default.PropTypes.bool,
    disabled: _react2.default.PropTypes.bool,
    componentClass: _react2.default.PropTypes.string,
    href: _react2.default.PropTypes.string,
    target: _react2.default.PropTypes.string,
    onClick: _react2.default.PropTypes.func
  },

  getDefaultProps: function getDefaultProps() {
    return {
      disabled: false
    };
  },
  onClick: function onClick(event) {
    event.preventDefault();
    var _props = this.props;
    var onClick = _props.onClick;
    var isDisabled = _props.isDisabled;

    if (onClick && !isDisabled) {
      onClick(event);
    }
  },
  render: function render() {
    var _props2 = this.props;
    var type = _props2.type;
    var buttonText = _props2.buttonText;
    var active = _props2.active;
    var disabled = _props2.disabled;
    var componentClass = _props2.componentClass;
    var href = _props2.href;
    var target = _props2.target;
    var onClick = _props2.onClick;

    var buttonClass = 'btn ' + componentClass;

    if (type === 'button') {
      return _react2.default.createElement(
        'button',
        { className: buttonClass, disabled: disabled, onClick: onClick },
        buttonText
      );
    } else if (type === 'span') {
      return _react2.default.createElement(
        'span',
        { className: buttonClass, disabled: disabled, onClick: onClick },
        buttonText
      );
    } else if (type === 'reset') {
      return _react2.default.createElement('input', { type: 'reset', value: buttonText, className: buttonClass, disabled: disabled, onClick: onClick });
    } else if (type === 'submit') {
      return _react2.default.createElement('input', { type: 'submit', value: buttonText, className: buttonClass, disabled: disabled, onClick: onClick });
    } else {
      return _react2.default.createElement(
        'a',
        { href: href, className: buttonClass, disabled: disabled },
        buttonText
      );
    }
  }
});

module.exports.button = button;
"use strict";

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var fancySelect = _react2.default.createClass({
  displayName: "fancySelect",

  propTypes: {
    selectName: _react2.default.PropTypes.string.isRequired,
    selectValue: _react2.default.PropTypes.string,
    placeholder: _react2.default.PropTypes.shape({
      optionText: _react2.default.PropTypes.string.isRequired,
      optionValue: _react2.default.PropTypes.string
    }),
    selectOptions: _react2.default.PropTypes.array.isRequired,
    eventHandler: _react2.default.PropTypes.func.isRequired
  },

  eventHandler: function eventHandler(e) {
    var eventHandler = this.props.eventHandler;

    if (eventHandler) {
      eventHandler(e);
    }
  },
  render: function render() {
    var _props = this.props;
    var selectName = _props.selectName;
    var placeholder = _props.placeholder;
    var selectOptions = _props.selectOptions;
    var selectValue = _props.selectValue;
    var eventHandler = _props.eventHandler;


    if (placeholder) {
      return _react2.default.createElement(
        "label",
        { htmlFor: selectName, className: "fancy-select" },
        _react2.default.createElement(
          "select",
          { name: selectName, id: selectName, value: selectValue, onChange: eventHandler },
          _react2.default.createElement(
            "option",
            { value: placeholder.optionValue },
            placeholder.optionText
          ),
          selectOptions.map(function (option, i) {
            return _react2.default.createElement(
              "option",
              { value: option.optionValue, key: i },
              option.optionText
            );
          })
        )
      );
    } else {
      return _react2.default.createElement(
        "label",
        { htmlFor: selectName, className: "lm-select" },
        _react2.default.createElement(
          "select",
          { name: selectName, id: selectName, value: selectValue, onChange: eventHandler },
          selectOptions.map(function (option, i) {
            return _react2.default.createElement(
              "option",
              { value: option.optionValue, key: i },
              option.optionText
            );
          })
        )
      );
    }
  }
});

module.exports.fancySelect = fancySelect;
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

module.exports.livesearch = liveSearch;