import { UiControlClient } from 'askui';
import 'jest-allure-circus';
import { askuiAllureStepReporter } from './askui-allure-step-reporter';
import { convertBase64StringToBuffer } from './video-reporting-utils';
import { ContentType } from "allure-js-commons";


// eslint-disable-next-line import/no-mutable-exports
let aui: UiControlClient;

jest.setTimeout(60 * 1000 * 60);

beforeAll(async () => {
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
  aui.disconnect();
});

export { aui };
