import { UiControlClient } from "askui";
import {setupMockServer} from './setup-mock-server';

// eslint-disable-next-line import/no-mutable-exports
let aui: UiControlClient;

jest.setTimeout(60 * 1000 * 60);

beforeAll(async () => {
  await setupMockServer();

  aui = await UiControlClient.build({
    inferenceServerUrl:
      process.env["ASKUI_INFERENCE_SERVER_URL"] ??
      "http://localhost:32768",
  });

  await aui.connect();
});

// beforeEach(async () => {
//   await aui.startVideoRecording();
// });

// afterEach(async () => {
//   await aui.stopVideoRecording();
//   const video = await aui.readVideoRecording();
//   allure.createAttachment(
//     "Video",
//     convertBase64StringToBuffer(video),
//     ContentType.WEBM
//   );
// });

afterAll(async () => {
  aui.disconnect();
});

export { aui };
