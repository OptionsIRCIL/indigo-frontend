# Git Hooks

Please review the contents of the git hooks in this directory, then enable them by running the following commands.

```sh
npm install --save-dev --save-exact prettier

chmod +x pre-commit post-commit
cp -v pre-commit post-commit ../.git/hooks
```
