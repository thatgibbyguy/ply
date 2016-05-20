import React from 'react';

const types = ['button', 'reset', 'span', 'submit']

const button = React.createClass({

  propTypes: {
    type: React.PropTypes.oneOf(types),
    buttonText: React.PropTypes.string,
    active: React.PropTypes.bool,
      disabled: React.PropTypes.bool,
      componentClass: React.PropTypes.string,
      href: React.PropTypes.string,
      target: React.PropTypes.string,
      onClick: React.PropTypes.func
  },

  getDefaultProps() {
    return {
      disabled: false
    }
  },

  onClick(event) {
    event.preventDefault();
    const {onClick, isDisabled} = this.props;
    if (onClick && !isDisabled) {
      onClick(event);
    }
  },

  render() {
    const {type, buttonText, active, disabled, componentClass, href, target, onClick} = this.props;
    const buttonClass = `btn ${componentClass}`;

    if (type === 'button') {
      return (
        <button className={buttonClass} disabled={disabled} onClick={onClick}>
          {buttonText}
        </button>
      );
    }

    else if (type === 'span') {
      return (
        <span className={buttonClass} disabled={disabled} onClick={onClick}>
          {buttonText}
        </span>
      )
    }

    else if (type === 'reset') {
      return (
        <input type="reset" value={buttonText} className={buttonClass} disabled={disabled} onClick={onClick} />
      )
    }

    else if (type === 'submit') {
      return (
        <input type="submit" value={buttonText} className={buttonClass} disabled={disabled} onClick={onClick} />
      )
    }

    else {
      return (
        <a href={href} className={buttonClass} disabled={disabled}>{buttonText}</a>
      )
    }

  }

});

module.exports = button;