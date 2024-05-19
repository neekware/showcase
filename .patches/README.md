# Node Packages Patches

This directory contains patches for node packages.

## How to create patches

### Create a patch for a package

Extract a copy of the package to be patched

```sh
# Extract a copy of the package to be patched
# uuid is our package to be patched
# tmp is the directory where the package will be extracted
pnpm patch uuid -d tmp
```

### Perform the patch

Make the changes to the files in your packages. You can look at the `tmp/packages.json` file, or `tmp/dist` directory to see what files are in the package.

In the above example, the `tmp/dist/bin/uuid` file points to the `tmp/dist/uuid-bin.js` file.
So we simply add a `// hello patch` comment to the `tmp/dist/uuid-bin.js` file.

### Commit the patch

```sh
# Commit the patch that is found in the tmp directory and place it in the .patches directory
pnpm patch-commit tmp  --patches-dir .patches
```

### Apply the patch

```sh
# pnpm patch-commit will create a .patches directory move the patched file there and update the package.json file and add a patchedDependencies section.
# It will call the pnpm install as well, however, you can manually call it if you want.
pnpm install
```

### Verify the patch

Look at the `package.json` file and you should see something like this:

```json
  "pnpm": {
    "patchedDependencies": {
      "...": "...",
      "uuid@2.0.0": ".patches/uuid@2.0.0.patch"
    }
  }
```

Look at the `node_modules/uuid/dist/uuid-bin.js` file and you should see the `// hello patch` comment.

### Clean up

```sh
rm -rf tmp
```

### Commit the .patch directory to git

```sh
git add .patches
git commit -m "Add patch for uuid"
git push
```

You are done!
