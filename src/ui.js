import * as React from 'react';
import * as ReactDOM from 'react-dom';

import './ui.css';

class App extends React.Component {
  countRef = (element) => {
    if (element) element.value = '5';
    this.textbox = element;
  };

  onCreate = () => {
    const count = parseInt(this.textbox.value, 10);

    parent.postMessage(
      { pluginMessage: { type: 'create-rectangles', count } },
      '*'
    );
  };

  closePlugin = () => {
    parent.postMessage({ pluginMessage: { type: 'close-plugin' } }, '*');
  };

  render() {
    return (
      <div>
        <div className="header">
          <img alt="box icon" src={require('./box.svg')} />
          <h3>A Few Examples</h3>
        </div>

        <p>
          {`Count: `}
          <input ref={this.countRef} />
        </p>
        <button id="create" onClick={this.onCreate} type="submit">
          Create
        </button>
        <button onClick={this.closePlugin} type="button">
          Close Plugin
        </button>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
