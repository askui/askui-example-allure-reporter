import 'dotenv/config';
import { UiControlClient } from "askui";
import { AskUIAllureStepReporter } from "@askui/askui-reporters";
import { GenericContainer, StartedTestContainer } from 'testcontainers';

jest.setTimeout(60 * 1000 * 60);

let aui: UiControlClient;

let uiControllerContainer: StartedTestContainer;

async function startTestContainer(): Promise<StartedTestContainer> {
  const container = new GenericContainer(process.env["ASKUI_CONTROLLER_DOCKER_IMAGE"])
  const BYTES_PER_GIBIBYTE = 1024 * 1024 * 1024
  const startedContainer = await container.withExposedPorts(6769).withSharedMemorySize(2 * BYTES_PER_GIBIBYTE).start();
  return startedContainer;
}

const appUsername = process.env["APP_USERNAME"];
const appUserpass = process.env["APP_USERPASS"];

beforeEach(async () => {
  uiControllerContainer = await startTestContainer();
  aui = await UiControlClient.build({
    inferenceServerUrl:
      process.env["ASKUI_INFERENCE_SERVER_URL"],
    uiControllerUrl: `http://${uiControllerContainer.getHost()}:${uiControllerContainer.getMappedPort(6769)}`,
    reporter: new AskUIAllureStepReporter({
      withScreenshots: 'always',
    }),
  });
  await aui.connect()
});

beforeEach(async () => {
  await aui.startVideoRecording();
});

beforeEach(async () => {
  await aui.type('https://www.w3schools.com/howto/howto_css_login_form.asp').exec();
  await aui.pressKey("enter").exec();
  await aui.waitFor(2000).exec(); 
  await aui.click().button().withText('Login').below().text('Click on the button to open the login form:').exec();
  await aui.typeIn(appUsername).textfield().below().text('Username').exec();
  await aui.typeIn(appUserpass).textfield().below().text('Password').exec();
  await aui.click().button().withText('Login').above().text('Remember me').exec();
});

afterEach(async () => {
  await aui.stopVideoRecording();
  const video = await aui.readVideoRecording();
  AskUIAllureStepReporter.attachVideo(video);
});

afterEach(async () => {
  aui.disconnect();
  uiControllerContainer.stop();
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
