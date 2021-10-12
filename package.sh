#!/bin/bash -e

rm -f ~/Desktop/mapvisualization.tar.gz
tar cz \
  --exclude=".git" \
  --exclude=".gitignore" \
  --exclude="package.sh" \
  --exclude=".jekyll-cache" \
  --exclude="_site" \
  --exclude="dist" \
  --exclude="node_modules" \
  . \
  --transform='s,^\./,,' \
  > ~/Desktop/mapvisualization.tar.gz
