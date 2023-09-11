import { UiControlClient } from "askui";
import { AskUIAllureStepReporter } from "@askui/askui-reporters";

// eslint-disable-next-line import/no-mutable-exports
let aui: UiControlClient;

jest.setTimeout(60 * 1000 * 60);

beforeAll(async () => {

  aui = await UiControlClient.build({
    inferenceServerUrl:
      process.env["ASKUI_INFERENCE_SERVER_URL"] ??
      "https://inference-dev.askui.com",
    uiControllerUrl:
      process.env["UI_CONTROLLER_URL"] ??
      "http://127.0.0.1:6769",
    reporter: new AskUIAllureStepReporter(),
  });

  await aui.connect();
});

beforeEach(async () => {
  await aui.startVideoRecording();
});

afterEach(async () => {
  await aui.stopVideoRecording();
  const video = await aui.readVideoRecording();
  AskUIAllureStepReporter.attachVideo(video);
});

afterAll(async () => {
  aui.disconnect();
});

export { aui };
