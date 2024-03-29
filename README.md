# 📇 askui-example-allure-reporter

An example of how to use [Allure](https://github.com/allure-framework/allure2) with [AskUI](https://github.com/askui/askui) and `jest` to get reporting with step-level-reporting and video-reporting included.

## 🖥️ Installation

1. Install allure

https://github.com/allure-framework/allure2#download

2. Install example project's dependencies

```shell
# Root folder
npm install
```

## 📝 Configuration

1. You need to configure credentials to be able to run the example. See [AskUI UI Control Client docs](https://docs.askui.com/docs/general/Components/askui-ui-control-client#credentials)

2. Also the example assumes that you start the AskUI UI Controller manually instead of through the `beforeAll` and `afterAll` (teardown) hooks.

Downloads:

* [Windows]([https://files.askui.com/releases/preview/v23.10.01/askui+Installer.exe](https://files.askui.com/releases/Installer/24.2.1/AskUI-Suite-24.2.1-System-Installer-Win-AMD64-Full.exe))
* [Linux](https://files.askui.com/releases/askui-ui-controller/latest/linux/x64/askui-ui-controller.AppImage)

> ℹ️ **macOS** After installation to `Applications` remove the quarantine flag with the following command run from a terminal: `xattr -d com.apple.quarantine /Applications/askui-ui-controller.app`

* [macOS(Intel)](https://files.askui.com/releases/askui-ui-controller/latest/darwin/x64/askui-ui-controller.dmg)
* [macOS(Apple silicon)](https://files.askui.com/releases/askui-ui-controller/latest/darwin/arm64/askui-ui-controller.dmg)

3. Set the environment variable `ASKUI_INFERENCE_SERVER_URL` for your terminal session like this:

```
export ASKUI_INFERENCE_SERVER_URL=https://inference.askui.com
```

## 🦾 Usage

Tests can be run with:
```shell
npm run test
```

## After running tests you can generate the allure report with:

```shell
allure serve ./allure-results
```

## 🔧 Details

* [Github-Pipelines](https://github.com/askui/askui-example-allure-reporter/tree/main/.github/workflows)
* [Rendered report](https://askui.github.io/askui-example-allure-reporter/6/)
* [The reporter implementation]([https://github.com/askui/askui-example-allure-reporter/blob/main/test/helper/askui-allure-step-reporter.ts](https://github.com/askui/askui-reporters/blob/main/src/allure/askui-allure-step-reporter.ts))
* [Enabling reporter and videorecording](https://github.com/askui/askui-example-allure-reporter/blob/main/test/helper/jest.setup.ts)
* [testEnvironment configuration for Allure](https://github.com/askui/askui-example-allure-reporter/blob/main/test/jest.config.ts)
