import { Reporter, Step, StepStatus, Annotation, DetectedElement } from "askui";
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

function createScreenshotOrHTMLAttachment(
  screenshot: string,
  detectedElements: Readonly<Readonly<DetectedElement>>[])
{
  if (detectedElements !== undefined) {
    const annotation = new Annotation(
      screenshot,
      detectedElements
    );
    const annotated = annotation.toHtml().serialize(); 
    return {
      name: "Before Screenshot with Annotation",
      type: {
        contentType: "text/html",
        fileExtension: ".html",
      },
      content: annotated,
    };
  } else {
    return {
      name: "Before Screenshot",
      type: "image/png",
      content: convertPngDataUrlToBuffer(screenshot),
    };
  }
}

export class askuiAllureStepReporter implements Reporter {
  config = {
    withScreenshots: 'always' as const,
    withDetectedElements: 'always' as const,
  };

  async onStepEnd(step: Step): Promise<void> {
    const status = mapAskuiToAllureStepStatus(step.status);
    const attachments = [];

    if (step.lastRun?.begin?.screenshot !== undefined) {
      attachments.push(createScreenshotOrHTMLAttachment(
        step.lastRun?.begin?.screenshot,
        step.lastRun?.begin?.detectedElements
      ));
    }
    if (step.lastRun?.end?.screenshot !== undefined) {
      attachments.push(createScreenshotOrHTMLAttachment(
        step.lastRun?.end?.screenshot,
        step.lastRun?.end?.detectedElements
      ));
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
