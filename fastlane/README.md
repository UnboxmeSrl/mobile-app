fastlane documentation
----

# Installation

Make sure you have the latest version of the Xcode command line tools installed:

```sh
xcode-select --install
```

For _fastlane_ installation instructions, see [Installing _fastlane_](https://docs.fastlane.tools/#installing-fastlane)

# Available Actions

### increment_build

```sh
[bundle exec] fastlane increment_build
```



### getVersion

```sh
[bundle exec] fastlane getVersion
```



### getBuildNumber

```sh
[bundle exec] fastlane getBuildNumber
```



### handle_changelog

```sh
[bundle exec] fastlane handle_changelog
```



### notify_slack

```sh
[bundle exec] fastlane notify_slack
```



### release_all

```sh
[bundle exec] fastlane release_all
```



----


## iOS

### iOS build_and_upload

```sh
[bundle exec] fastlane iOS build_and_upload
```

Push a new beta build to TestFlight

----


## Android

### android build

```sh
[bundle exec] fastlane android build
```



### android build_and_upload

```sh
[bundle exec] fastlane android build_and_upload
```



----

This README.md is auto-generated and will be re-generated every time [_fastlane_](https://fastlane.tools) is run.

More information about _fastlane_ can be found on [fastlane.tools](https://fastlane.tools).

The documentation of _fastlane_ can be found on [docs.fastlane.tools](https://docs.fastlane.tools).
