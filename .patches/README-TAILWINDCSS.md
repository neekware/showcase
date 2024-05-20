# How to patch

Note: I use pnpm here, but you can use npm or yarn.

### 1 - Install the following dev dependencies.

```
  "devDependencies": {
    "@softonus/prettier-plugin-duplicate-remover": "^1.0.1",
    "@softonus/prettier-plugin-whitespace-remover": "^1.0.1",
    "prettier": "^3.2.5",
    "prettier-plugin-tailwindcss": "0.5.14" // <-- pin down this by removing the ^
  }
```

### 2 - Run the patch command from within the root of your project.

```
pnpm patch prettier-plugin-tailwindcss -d tmp
```

### 3 - Open the right file to update

```
vim tmp/dist/index.mjs
```

### 4 - Find the list includes

```
prettier-plugin-sort-imports
```

### 5 - Manually add the whitespace-remover and duplicate-remover to the list

```
let e=[
    "@ianvs/prettier-plugin-sort-imports",
    "@trivago/prettier-plugin-sort-imports",
    "@softonus/prettier-plugin-whitespace-remover",  // <- this
    "@softonus/prettier-plugin-duplicate-remover",     // <- and this
    "prettier-plugin-organize-imports",
    "prettier-plugin-css-order",
    "prettier-plugin-import-sort",
    "prettier-plugin-jsdoc",
    "prettier-plugin-organize-attributes",
    "prettier-plugin-style-order",
    "prettier-plugin-sort-imports"
]
```

### 6 - Extract the patch file to a local directory called .patches

```
pnpm patch-commit tmp  --patches-dir .patches
```

### 7 - Install the new patch in package.json

```
pnpm install
```

### 8 - Verify the patch

Look at the `package.json` file and you should see something like this:

```json
  "pnpm": {
    "patchedDependencies": {
      "prettier-plugin-tailwindcss@0.5.14": ".patches/prettier-plugin-tailwindcss@0.5.14.patch"
    }
```

### 9 - Clean up

```sh
rm -rf tmp
```

### 10 - Update your prettier config

```
  plugins: [
    require.resolve('@softonus/prettier-plugin-whitespace-remover'),
    require.resolve('@softonus/prettier-plugin-duplicate-remover'),
    require.resolve('prettier-plugin-tailwindcss'),
  ],
```

### 11 - Commit the .patches directory, and the changes to package.json and prettier config to git

```sh
git add .patches
git commit -am "Add patch for tailwindcss whitespace and duplicate removal"
git push
```

You are done!
