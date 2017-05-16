import React from 'react';
import { object } from 'prop-types';
import { Panel } from 'react-bootstrap';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import { connect } from 'react-redux';
import { FormattedMessage, defineMessages } from 'react-intl';

import { getNews } from '../../../common/news/news.actions';
import fetch from '../../fetch';

export const msg = defineMessages({
  readmore: {
    id: 'news.readmore',
    defaultMessage: 'read more'
  }
});

const fetchData = ({ dispatch }) =>
  dispatch(getNews());

class News extends React.Component {
  render() {
    const { items, loading } = this.props.news;

    return (
      <div>
        <h1>Some big news</h1>
        {loading && <div>loading...</div>}
        {items.map(({ title, description, link, pubDate }) => (
          <Panel key={title}>
            <h6>{format(parse(pubDate), 'MM/DD/YYYY')}</h6>
            <h4>{title}</h4>
            <div>
              {description} {' '}
              <a href={link} target="_blank">
                <FormattedMessage {...msg.readmore} />
              </a>
            </div>
          </Panel>
        ))}
      </div>
    );
  }
}

News.propTypes = {
  news: object.isRequired
};

const ConnectedComponent = connect(
  state => ({
    news: state.news
  }),
  { getNews }
)(News);

export default fetch(fetchData)(ConnectedComponent);
