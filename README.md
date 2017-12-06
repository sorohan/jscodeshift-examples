# jscodeshift-examples

## Install

```bash
npm install -g jscodeshift
```

## Mods

```bash
jscodeshift -t mods/noop.js src/add-numbers.js -d -p
```

```bash
jscodeshift -t mods/remove-console-logs.js src/add-numbers.js -d -p
```

```bash
jscodeshift -t mods/remove-console-logs.js src/add-numbers.js -d -p
```

```bash
jscodeshift -t mods/change-function-signature.js src/add-numbers.js -d -p
```

```bash
jscodeshift -t mods/insert-wrapper-function.js src/add-numbers.js -d -p
```

```bash
jscodeshift -t mods/all.js src/add-numbers.js -d -p
```
