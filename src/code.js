// https://www.figma.com/plugin-docs/api/properties/figma-showui/
figma.showUI(__html__, { height: 400, width: 380, themeColors: true });

console.clear();

// main listener on Figma scene side
// https://www.figma.com/plugin-docs/api/figma-ui/#onmessage
figma.ui.onmessage = async (msg) => {
  const { type } = msg;

  // create rectangle example
  // ///////////////////////////////////////////////////////////////////////////
  if (type === 'create-rectangles') {
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
  // ///////////////////////////////////////////////////////////////////////////
  if (type === 'get-selected-count') {
    // respond to UI layer
    // https://www.figma.com/plugin-docs/api/figma-ui/#postmessage
    figma.ui.postMessage({
      type: 'selected-count',
      data: { count: figma.currentPage.selection.length }
    });
  }

  // zoom into view
  // ///////////////////////////////////////////////////////////////////////////
  if (type === 'zoom-into-view') {
    // https://www.figma.com/plugin-docs/api/figma-viewport/#scrollandzoomintoview
    const testNode = figma.getNodeById('2:2');
    const testNode2 = figma.getNodeById('6:8');

    figma.viewport.scrollAndZoomIntoView([testNode, testNode2]);
  }

  // traversing
  // ///////////////////////////////////////////////////////////////////////////
  if (type === 'traversing') {
    const [selectedNode] = figma.currentPage.selection;
    const selectedNodeId = selectedNode.id;

    // https://www.figma.com/plugin-docs/accessing-document/#traversing-all-nodes-in-the-page
    const nodeWrapper = figma.getNodeById(selectedNodeId);
    // console.log('nodeWrapper', nodeWrapper);

    // make sure the node selected has child nodes
    if (nodeWrapper.children === undefined) {
      console.error('can only search on Nodes with children');
    } else {
      // find images in selected node/page
      const imageNodes = nodeWrapper.findAll((node) => {
        const { fills } = node;
        // console.log('node', node);
        // console.log('node.type', node.type);
        // console.log('fills', fills);
        // console.log('========');

        const imageFills =
          fills === undefined
            ? []
            : fills.filter((fill) => fill.type === 'IMAGE');

        return imageFills.length > 0;
      });

      // loop through nodes that have images and grab bytes of image
      const imagesData = await Promise.all(
        imageNodes.map(async (image) => {
          const { fills, id, name } = image;

          // get the first fill that is an image type
          const [imageFill] = fills.filter((fill) => fill.type === 'IMAGE');
          const { imageHash } = imageFill;

          // get image data by hash
          // https://www.figma.com/plugin-docs/working-with-images/
          const imageData = figma.getImageByHash(imageHash);
          const bytes = await imageData.getBytesAsync();

          // https://www.figma.com/plugin-docs/api/figma/#base64encode
          const base64 = figma.base64Encode(bytes);

          return {
            base64,
            id,
            imageHash,
            name
          };
        })
      );

      figma.ui.postMessage({
        type: 'selected-images',
        data: { images: imagesData }
      });
    }
  }

  // resize plugin
  // ///////////////////////////////////////////////////////////////////////////
  if (type === 'resize-plugin') {
    const { height, width } = msg;

    // https://www.figma.com/plugin-docs/api/figma-ui/#resize
    figma.ui.resize(width, height);
  }

  // close plugin
  // ///////////////////////////////////////////////////////////////////////////
  if (type === 'close-plugin') {
    // https://www.figma.com/plugin-docs/api/figma-ui/#close
    figma.closePlugin();
  }
};

// listener on selection change
// https://www.figma.com/plugin-docs/api/properties/figma-on/
figma.on('selectionchange', () => {
  figma.ui.postMessage({
    type: 'selected-count',
    data: { count: figma.currentPage.selection.length }
  });
});
