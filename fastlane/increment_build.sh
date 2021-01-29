json -I -f ../package.json -e 'this.buildNumber=this.buildNumber+1'
NEW_BUILD_NUMBER=$(json -f ../package.json buildNumber)
git add ../package.json
git commit -m "chore: bump buildNumber to $NEW_BUILD_NUMBER"
