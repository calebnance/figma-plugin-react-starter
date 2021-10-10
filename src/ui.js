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

  onCancel = () => {
    parent.postMessage({ pluginMessage: { type: 'cancel' } }, '*');
  };

  render() {
    return (
      <div>
        <img alt="logo icon" src={require('./logo.svg')} />
        <h2>Rectangle Creator</h2>
        <p>
          {`Count: `}
          <input ref={this.countRef} />
        </p>
        <button id="create" onClick={this.onCreate} type="submit">
          Create
        </button>
        <button onClick={this.onCancel} type="button">
          Cancel
        </button>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
