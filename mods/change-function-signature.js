export default (fileInfo, api) => {
  const j = api.jscodeshift;
  const root = j(fileInfo.source);

  // Find imports of add from utils
  const importDeclaration = root.find(j.ImportDeclaration, {
      source: { type: 'Literal', value: 'utils' },
      specifiers: [{ imported: { name: 'add' }, }],
    });

  // Get local name of 'add' function
  const localName = importDeclaration.find(j.ImportSpecifier, {
      imported: { name: 'add' },
    })
    .get(0)
    .node
    .local.name;

  // Find calls to add
  return root.find(j.CallExpression, {
      callee: { name: localName },
    })
    .replaceWith(nodePath => {
      const { node } = nodePath;
      // Change arguments to an array
      node.arguments = [
        j.arrayExpression(node.arguments),
      ];
      return node;
    })
    .toSource();
};
