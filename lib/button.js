'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var types = ['button', 'reset', 'span', 'submit'];

exports.default = _react2.default.createClass({
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