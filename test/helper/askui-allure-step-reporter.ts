import { Reporter, Step, StepStatus } from "askui";
import { Status } from "jest-allure-circus";

function convertPngDataUrlToBuffer(pngDataUrl: string): Buffer {
  const base64Data = pngDataUrl.replace(/^data:image\/png;base64,/, "");
  const buffer = Buffer.from(base64Data, "base64");
  return buffer;
}

function mapAskuiToAllureStepStatus(status: StepStatus): Status {
  switch (status) {
    case "passed":
      return Status.PASSED;
    case "failed":
      return Status.FAILED;
    case "erroneous":
      return Status.BROKEN;
    default:
      return Status.SKIPPED;
  }
}

export class askuiAllureStepReporter implements Reporter {
  config = {
    withScreenshots: 'always' as const,
  };

  async onStepEnd(step: Step): Promise<void> {
    const status = mapAskuiToAllureStepStatus(step.status);
    const attachments = [];
    if (step.lastRun?.begin?.screenshot !== undefined) {
      attachments.push({
        name: "Before Screenshot",
        type: "image/png",
        content: convertPngDataUrlToBuffer(step.lastRun?.begin?.screenshot),
      });
    }
    if (step.lastRun?.end?.screenshot !== undefined) {
      attachments.push({
        name: "After Screenshot",
        type: "image/png",
        content: convertPngDataUrlToBuffer(step.lastRun?.end?.screenshot),
      });
    }
    allure.logStep(
      step.instruction.valueHumanReadable,
      status,
      attachments,
    );
    allure.currentTest.status = status;
    if (step.error !== undefined) {
      allure.currentTest.detailsMessage = `${step.error.name}: ${step.error.message}`;
      allure.currentTest.detailsTrace = step.error.stack;
    }
  }
}
