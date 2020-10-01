git add .
git commit -m"new version"
git push origin master
npm version patch
npm publish --registry https://verdaccio.oneclick.es/
