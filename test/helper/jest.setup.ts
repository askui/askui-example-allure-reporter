import { UiControlClient, UiController } from 'askui';
import 'jest-allure-circus';
import { askuiAllureStepReporter } from './askui-allure-step-reporter';
import './video-reporting-utils';
import { convertBase64StringToBuffer } from './video-reporting-utils';
import { ContentType } from "allure-js-commons";


// Server for controlling the operating system
let uiController: UiController;

// Client is necessary to use the askui API
// eslint-disable-next-line import/no-mutable-exports
let aui: UiControlClient;

jest.setTimeout(60 * 1000 * 60);

beforeAll(async () => {
  uiController = new UiController({
    /**
     * Select the display you want to run your tests on, display 0 is your main display;
     * ignore if you have only one display
     */
    display: 0,
  });

  aui = await UiControlClient.build({
    reporter: new askuiAllureStepReporter(),
  });

  await aui.connect();
});

beforeEach(async () => {
  await aui.startVideoRecording();
});

afterEach(async () => {
  await aui.stopVideoRecording();
  const video = await aui.readVideoRecording();
  allure.createAttachment("Video", convertBase64StringToBuffer(video), ContentType.WEBM);
});

afterAll(async () => {
  aui.close();
});

export { aui };
