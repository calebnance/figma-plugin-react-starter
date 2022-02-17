// https://www.figma.com/plugin-docs/api/properties/figma-showui/
figma.showUI(__html__, { height: 400, width: 380 });

// main listener on Figma scene side
// https://www.figma.com/plugin-docs/api/figma-ui/#onmessage
figma.ui.onmessage = (msg) => {
  if (msg.type === 'create-rectangles') {
    const nodes = [];

    for (let i = 0; i < msg.count; i += 1) {
      const rect = figma.createRectangle();
      rect.x = i * 150;
      rect.fills = [{ type: 'SOLID', color: { r: 1, g: 0.5, b: 0 } }];

      figma.currentPage.appendChild(rect);

      nodes.push(rect);
    }

    figma.currentPage.selection = nodes;
    // https://www.figma.com/plugin-docs/api/figma-viewport/#scrollandzoomintoview
    figma.viewport.scrollAndZoomIntoView(nodes);
  }

  // get selected count
  if (msg.type === 'get-selected-count') {
    // respond to UI layer
    // https://www.figma.com/plugin-docs/api/figma-ui/#postmessage
    figma.ui.postMessage({
      type: 'selected-count',
      data: { count: figma.currentPage.selection.length }
    });
  }

  // zoom into view
  if (msg.type === 'zoom-into-view') {
    // https://www.figma.com/plugin-docs/api/figma-viewport/#scrollandzoomintoview
    const testNode = figma.getNodeById('2:6');
    const testNode2 = figma.getNodeById('2:5');

    figma.viewport.scrollAndZoomIntoView([testNode, testNode2]);
  }

  // close plugin
  if (msg.type === 'close-plugin') {
    // https://www.figma.com/plugin-docs/api/figma-ui/#close
    figma.closePlugin();
  }
};

// listener on selection change
// https://www.figma.com/plugin-docs/api/properties/figma-on/
figma.on('selectionchange', () => {
  console.log(figma.currentPage.selection);
});

// https://www.figma.com/plugin-docs/api/figma-ui/#resize
// figma.ui.resize(300, 300);
