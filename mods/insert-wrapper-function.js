export default (fileInfo, api) => {
  const j = api.jscodeshift;
  const root = j(fileInfo.source);

  // Find last import
  root.find(j.ImportDeclaration)
    .at(-1)
    // Insert new import
    .insertAfter(() => {
      return 'import log from \'logger\';'
    });

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
  root.find(j.CallExpression, {
      callee: { name: localName },
    })
    .replaceWith(nodePath => {
      const { node } = nodePath;
      // Wrap call to add
      const newCall = j.callExpression(
        j.memberExpression(
          j.identifier('Logger'),
          j.identifier('log'),
          false
        ),
        [node]
      );
      return newCall; // also works: j(newcall).toSource();
    });
  return root.toSource();
};
