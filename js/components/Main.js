import React from 'react';
import Relay from 'react-relay';

const _getLinks = () => ({ links: LinkStore.getAll() });


class Main extends React.Component {
    static propTypes = {
        limit: React.PropTypes.number.isRequired,
    }

    static defaultProps = {
        limit: 2,
    }

    render() {
        const content = this.props.store.links.slice(0, this.props.limit).map(link => {
            return (
                <li key={link._id}>
                    <a href={link.url}> {link.title} </a>
                </li>
            );
        });
        return (
              <div>
                <h3>Links</h3>
                <ul>
                  {content}
                </ul>
              </div>
          );
    }
}

// Declare the data requirements for this Component
Main = Relay.createContainer(Main, {
  fragments: {
      store: () => Relay.QL`
          fragment on Store {
              links {
                  _id,
                  title,
                  url
              }
          }
      `
  }
})

export default Main;
