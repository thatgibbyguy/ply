"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _react2.default.createClass({
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


    if (placeholder) {
      return _react2.default.createElement(
        "label",
        { htmlFor: selectName, className: "lm-select" },
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