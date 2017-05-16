import React from 'react';
import { object } from 'prop-types';
import { Panel } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import { connect } from 'react-redux';
import { FormattedMessage, defineMessages } from 'react-intl';

export const msg = defineMessages({
  readmore: {
    id: 'news.readmore',
    defaultMessage: 'Enter your text here'
  }
});

class News extends React.Component {
  render() {
    const { list } = this.props.news;

    return (
      <div>
        <h1>Some big new</h1>
        {list.map(({ title, description, link, publishDate }) => (
          <Panel>
            <h6>{format(parse(publishDate), 'L')}</h6>
            <h4>{title}</h4>
            <div>
              {description} {' '}
              <Link href={link} target="_blank">
                <FormattedMessage {...msg.readmore} />
              </Link>
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

export default connect(state => ({
  news: state.news
}))(News);
