# askui-example-allure-reporter

An example of how to use [allure](https://github.com/allure-framework/allure2) with [askui](https://github.com/askui/askui) and `jest` to get reporting with step-level-reporting and video-reporting included.

## Installation

1. Install allure

https://github.com/allure-framework/allure2#download

2. Install test project's dependencies

```shell
npm install
```

## Configuration

You need to configure credentials to be able to run the example. See https://docs.askui.com/docs/api/Configuration/askui-ui-control-client#credentials

Also the example assumes that you start the askui UI Controller manually instead of through the `beforeAll` and `afterAll` (teardown) hooks.

## Usage

Tests can be run with:
```shell
npx jest --config ./test/jest.config.ts
```

## After running tests you can generate the allure report with:

```shell
allure serve ./allure-results
```
