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
    const testNode = figma.getNodeById('2:2');
    const testNode2 = figma.getNodeById('6:8');

    figma.viewport.scrollAndZoomIntoView([testNode, testNode2]);
  }

  // traversing
  if (msg.type === 'traversing') {
    // https://www.figma.com/plugin-docs/api/figma-viewport/#scrollandzoomintoview
    // const selectedImageNodes = figma.currentPage.selection.filter(
    //   (node) => node.type === 'IMAGE'
    // );

    // https://www.figma.com/plugin-docs/accessing-document/#traversing-all-nodes-in-the-page
    const nodeWrapper = figma.getNodeById('6:12');
    console.log('nodeWrapper', nodeWrapper);

    // find images in page
    const imageNodes = nodeWrapper.findAll((node) => {
      const { fills } = node;
      const imageFills =
        fills === undefined
          ? []
          : fills.filter((fill) => fill.type === 'IMAGE');

      return imageFills.length > 0;
    });

    console.log('imageNodes', imageNodes);
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
