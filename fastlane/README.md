fastlane documentation
================
# Installation

Make sure you have the latest version of the Xcode command line tools installed:

```
xcode-select --install
```

Install _fastlane_ using
```
[sudo] gem install fastlane -NV
```
or alternatively using `brew install fastlane`

# Available Actions
### increment_build
```
fastlane increment_build
```

### handle_changelog
```
fastlane handle_changelog
```

### release_all
```
fastlane release_all
```


----

## iOS
### ios build_and_upload
```
fastlane ios build_and_upload
```
Push a new beta build to TestFlight

----

## Android
### android build
```
fastlane android build
```

### android build_and_upload
```
fastlane android build_and_upload
```


----

This README.md is auto-generated and will be re-generated every time [fastlane](https://fastlane.tools) is run.
More information about fastlane can be found on [fastlane.tools](https://fastlane.tools).
The documentation of fastlane can be found on [docs.fastlane.tools](https://docs.fastlane.tools).
