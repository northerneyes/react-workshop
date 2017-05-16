import React from 'react';
import PropTypes from 'prop-types';

export default class FetchProvider extends React.Component {
  getChildContext() {
    return {
      fetches: this.props.fetches
    };
  }

  render() {
    return this.props.children;
  }
}

FetchProvider.propTypes = {
  children: PropTypes.node.isRequired,
  fetches: PropTypes.array
};

FetchProvider.childContextTypes = {
  fetches: PropTypes.array
};