import * as React from 'react';
import * as ReactDOM from 'react-dom';

// scss base
import './ui.scss';

const getSelectedCount = () => {
  // post to code layer
  parent.postMessage({ pluginMessage: { type: 'get-selected-count' } }, '*');
};

const zoomIntoView = () => {
  // post to code layer
  parent.postMessage({ pluginMessage: { type: 'zoom-into-view' } }, '*');
};

const traversing = () => {
  // post to code layer
  parent.postMessage({ pluginMessage: { type: 'traversing' } }, '*');
};

const resize = (height, width) => {
  // post to code layer
  parent.postMessage(
    { pluginMessage: { type: 'resize-plugin', height, width } },
    '*'
  );
};

const closePlugin = () => {
  // post to code layer
  parent.postMessage({ pluginMessage: { type: 'close-plugin' } }, '*');
};

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      selectedCount: null,
      selectedImages: null
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

    if (type === 'selected-images') {
      this.setState({
        selectedImages: data.images
      });
    }
  }

  render() {
    const { selectedCount, selectedImages } = this.state;

    return (
      <main>
        <div className="header">
          <img alt="box icon" src={require('./assets/box.svg')} />
          <h1>Examples</h1>
        </div>

        <div className="spacer-16" />

        <section>
          <h2>Reading the Figma Document</h2>

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

          {selectedCount === 1 && (
            <React.Fragment>
              <div className="spacer-16" />

              <button onClick={traversing} type="button">
                Find Images | Traversing Example
              </button>
            </React.Fragment>
          )}

          {selectedImages && (
            <React.Fragment>
              <div className="spacer-16" />

              <div className="flex-row-space flex-wrap">
                {selectedImages.map((image) => {
                  const { base64, id, name } = image;

                  return (
                    <img
                      key={id}
                      alt={name}
                      className="preview-image"
                      src={`data:image/png;base64,${base64}`}
                    />
                  );
                })}
              </div>
            </React.Fragment>
          )}
        </section>

        <div className="spacer-16" />

        <button onClick={() => resize(500, 600)} type="button">
          Resize Plugin: 500H by 600W
        </button>

        <div className="spacer-16" />

        <button onClick={closePlugin} type="button">
          Close Plugin
        </button>
      </main>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
