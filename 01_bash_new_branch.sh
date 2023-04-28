#!/bin/bash  

echo "Write new name of branch: "
read git_branch

git checkout -b "$git_branch"
