import 'dotenv/config';
import { UiControlClient } from "askui";
import { AskUIAllureStepReporter } from "@askui/askui-reporters";
import { GenericContainer, StartedTestContainer } from 'testcontainers';

jest.setTimeout(60 * 1000 * 60);

let aui: UiControlClient;

async function startTestContainer(): Promise<StartedTestContainer> {
  const container = new GenericContainer(process.env["ASKUI_CONTROLLER_DOCKER_IMAGE"])
  const BYTES_PER_GIBIBYTE = 1024 * 1024 * 1024
  const startedContainer = await container.withExposedPorts(6769).withSharedMemorySize(2 * BYTES_PER_GIBIBYTE).start();
  return startedContainer;
}

beforeEach(async () => {
  const uiControllerContainer = await startTestContainer();
  aui = await UiControlClient.build({
    inferenceServerUrl:
      process.env["ASKUI_INFERENCE_SERVER_URL"],
    uiControllerUrl: `http://${uiControllerContainer.getHost()}:${uiControllerContainer.getMappedPort(6769)}`,
    reporter: new AskUIAllureStepReporter({
      withScreenshots: 'always',
    }),
  });
  await aui.connect()
  await aui.startVideoRecording();
});

afterEach(async () => {
  await aui.stopVideoRecording();
  const video = await aui.readVideoRecording();
  AskUIAllureStepReporter.attachVideo(video);
  aui.disconnect();
});

afterAll(async () => {
  const container = new GenericContainer("tobix/allure-cli");
  await container.withCommand(["generate", "/allure-results", "--clean", "-o", "/allure-report"]).withBindMounts([
    {
      source: `${process.cwd()}/allure-results`,
      target: '/allure-results',
      mode: 'ro',
    },
    {
      source: `${process.cwd()}/allure-report`,
      target: '/allure-report',
      mode: 'rw',
    },
  ]).start();
});


export {aui}
