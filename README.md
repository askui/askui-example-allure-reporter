# 📇 askui-example-allure-reporter

An example of how to use [Allure](https://github.com/allure-framework/allure2) with [askui](https://github.com/askui/askui) and `jest` to get reporting with step-level-reporting and video-reporting included.

## 🖥️ Installation

1. Install allure

https://github.com/allure-framework/allure2#download

2. Install example project's dependencies

```shell
# Root folder
npm install
```

## 📝 Configuration

1. You need to configure credentials to be able to run the example. See https://docs.askui.com/docs/api/Configuration/askui-ui-control-client#credentials

2. Also the example assumes that you start the askui UI Controller manually instead of through the `beforeAll` and `afterAll` (teardown) hooks.

Downloads:

* [Windows](https://askui-public.s3.eu-central-1.amazonaws.com/releases/askui-ui-controller/latest/win32/x64/askui-ui-controller.exe)
* [macOS](https://askui-public.s3.eu-central-1.amazonaws.com/releases/askui-ui-controller/latest/darwin/x64/askui-ui-controller.dmg)
* [Linux](https://askui-public.s3.eu-central-1.amazonaws.com/releases/askui-ui-controller/latest/linux/x64/askui-ui-controller.AppImage)

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
* [The reporter implementation](https://github.com/askui/askui-example-allure-reporter/blob/main/test/helper/askui-allure-step-reporter.ts)
* [Enabling reporter and videorecording](https://github.com/askui/askui-example-allure-reporter/blob/main/test/helper/jest.setup.ts)
* [testEnvironment configuration for Allure](https://github.com/askui/askui-example-allure-reporter/blob/main/test/jest.config.ts)
