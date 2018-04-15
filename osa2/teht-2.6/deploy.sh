#!/bin/sh

npm run build
rm -rf ../../../full-stack-open-submissions-part3/build
cp -r build ../../../full-stack-open-submissions-part3/

