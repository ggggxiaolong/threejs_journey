#!/usr/bin/env sh

# abort on errors
set -e

# build
npm run build:pro

# navigate into the build output directory
cd .vite/dist

# if you are deploying to a custom domain
echo 'chuntian.press' > CNAME

git init
git add -A
git commit -m 'deploy'

# if you are deploying to https://<USERNAME>.github.io
# git push -f git@github.com:<USERNAME>/<USERNAME>.github.io.git master

# if you are deploying to https://<USERNAME>.github.io/<REPO>
git push -f git@github.com:ggggxiaolong/threejs_journey.git main:gh-pages

cd -