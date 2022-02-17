import * as React from 'react';
import * as ReactDOM from 'react-dom';

import './ui.css';

const getSelectedCount = () => {
  // post to code layer
  parent.postMessage({ pluginMessage: { type: 'get-selected-count' } }, '*');
};

const zoomIntoView = () => {
  // post to code layer
  parent.postMessage({ pluginMessage: { type: 'zoom-into-view' } }, '*');
};

const closePlugin = () => {
  // post to code layer
  parent.postMessage({ pluginMessage: { type: 'close-plugin' } }, '*');
};

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      selectedCount: null
    };

    this.messageFromFigma = this.messageFromFigma.bind(this);
  }

  componentDidMount() {
    window.addEventListener('message', this.messageFromFigma);
  }

  componentWillUnmount() {
    window.removeEventListener('message', this.messageFromFigma);
  }

  // main listener for all messages from Figma bridge
  // https://www.figma.com/plugin-docs/how-plugins-run/
  messageFromFigma(event) {
    const { data, type } = event.data.pluginMessage;

    // selected count response
    if (type === 'selected-count') {
      this.setState({
        selectedCount: data.count
      });
    }
  }

  render() {
    const { selectedCount } = this.state;

    return (
      <main>
        <div className="header">
          <img alt="box icon" src={require('./box.svg')} />
          <h1>Examples</h1>
        </div>

        <section>
          <h4>Layer/Nodes</h4>

          <div className="flex-row-space">
            <button id="create" onClick={getSelectedCount} type="button">
              Get Selected Count
            </button>

            {selectedCount !== null && (
              <p>{`Selected count: ${selectedCount}`}</p>
            )}
          </div>

          <div className="spacer-16" />

          <button onClick={zoomIntoView} type="button">
            Zoom into View Example
          </button>
        </section>

        <div className="spacer-16" />

        <button onClick={closePlugin} type="button">
          Close Plugin
        </button>
      </main>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
