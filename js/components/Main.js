import React from 'react';
import API from '../API';
import LinkStore from '../stores/LinkStore';

const _getLinks = () => ({ links: LinkStore.getAll() });


class Main extends React.Component {
    static propTypes = {
        limit: React.PropTypes.number.isRequired,
    }

    static defaultProps = {
        limit: 2,
    }

    state = {
        links: LinkStore.getAll(),
    }

    componentDidMount() {
        API.fetchLinks();
        LinkStore.on('change', this.onChange);
    }

    componentWillUnmount() {
        LinkStore.removeListener('change', this.onChange);
    }

    onChange = () => {
        console.log('4. In the View');
        this.setState(_getLinks());
    }

    render() {
        const content = this.state.links.slice(0, this.props.limit).map(link => {
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

export default Main;
