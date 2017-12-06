export default (fileInfo, api) => {
  const j = api.jscodeshift; // get the API
  const root = j(fileInfo.source); // parse root the source

  // Find console.logs
  root.find(j.CallExpression, {
    callee: {
      object: { name: 'console' },
      property: { name: 'log' },
    },
  })
  .remove(); // Remove console.logs

  // Return mutated root source string.
  return root.toSource();
};
