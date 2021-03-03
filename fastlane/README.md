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

### getVersion
```
fastlane getVersion
```

### getBuildNumber
```
fastlane getBuildNumber
```

### handle_changelog
```
fastlane handle_changelog
```

### notify_slack
```
fastlane notify_slack
```

### release_all
```
fastlane release_all
```


----

## iOS
### iOS build_and_upload
```
fastlane iOS build_and_upload
```
Push a new beta build to TestFlight

----

## Android
### Android build
```
fastlane Android build
```

### Android build_and_upload
```
fastlane Android build_and_upload
```


----

This README.md is auto-generated and will be re-generated every time [fastlane](https://fastlane.tools) is run.
More information about fastlane can be found on [fastlane.tools](https://fastlane.tools).
The documentation of fastlane can be found on [docs.fastlane.tools](https://docs.fastlane.tools).
