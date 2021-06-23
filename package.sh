#!/bin/bash -e

rm -f ~/Desktop/mapvisualization.tar.gz
tar cz \
  --exclude=".git" \
  --exclude=".gitignore" \
  --exclude="package.sh" \
  . \
  --transform='s,^\./,,' \
  > ~/Desktop/mapvisualization.tar.gz
