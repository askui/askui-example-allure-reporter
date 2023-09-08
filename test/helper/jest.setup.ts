import { UiControlClient } from "askui";
import "jest-allure-circus";
import { AskUIAllureStepReporter } from "@askui/askui-reporters";
import { GenericContainer, StartedTestContainer } from 'testcontainers';

jest.setTimeout(60 * 1000 * 60);

function getDockerImageName(): string {
  const askuiUiControllerVersion = 'v0.11.2';
  const browser = 'chrome';
  const browserVersion = '100.0.4896.60';
  const osArch = 'amd64';
  return `askuigmbh/askui-ui-controller:${askuiUiControllerVersion}-${browser}-${browserVersion}-${osArch}`;
}

async function startTestContainer(): Promise<StartedTestContainer> {
  const container = new GenericContainer(getDockerImageName())
  const startedContainer = await container.withExposedPorts(6769, 5900).start();
  return startedContainer;
}

beforeEach(() => {

})

async function start(): Promise<{aui: UiControlClient, uiControllerContainer: StartedTestContainer}> {
  const uiControllerContainer = await startTestContainer();
  const aui = await UiControlClient.build({
    inferenceServerUrl:
      process.env["ASKUI_INFERENCE_SERVER_URL"] ??
      "https://inference.askui.com",
    uiControllerUrl: `http://${uiControllerContainer.getHost()}:${uiControllerContainer.getMappedPort(6769)}`,
    reporter: new AskUIAllureStepReporter({
      withScreenshots: 'always',
    })
  });
  aui.connect()
  await aui.startVideoRecording();
  return {aui, uiControllerContainer};
}

async function end(params: {aui: UiControlClient, uiControllerContainer: StartedTestContainer}): Promise<void> {
  const {aui, uiControllerContainer} = params;
  await aui.stopVideoRecording();
  const video = await aui.readVideoRecording();
  AskUIAllureStepReporter.attachVideo(video);
  aui.disconnect();
  uiControllerContainer.stop();
}

function askuiIt(name: string, fn: (aui: UiControlClient) => void): void {
  it(name, async () => {
    const {aui, uiControllerContainer} = await start();
    try {
      fn(aui);
      end({aui, uiControllerContainer});
    } catch (e) {
      end({aui, uiControllerContainer});
      throw e;
    }
  })
}

export {askuiIt}
