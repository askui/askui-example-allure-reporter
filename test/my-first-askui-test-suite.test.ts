import { askuiIt } from './helper/jest.setup';

describe('jest with askui', () => {
  askuiIt('should generate an annotation', async (aui) => {
    await aui.annotate();
  });

  askuiIt('should do a Google search given a browser with Google Search has already been opened and is focused', async (aui) => {
    await aui.click().text().containsText('Search Google or type a URL').exec();
    await aui.type('askui').exec();
    await aui.pressKey('enter').exec();
    await aui.getAll().exec();
  });

  // xit('should open the spotlight given it is running on Mac OS', async () => {
  //   await aui.pressTwoKeys('command', 'space').exec();
  //   await aui.type('askui', {isSecret: true}).exec();
  // })

  // xit('should click on "Submit" button if it is found, otherwise type something in closest text field', async () => {
  //   const submitButtons = await aui.get().button().withText('Submit').exec();
  //   if (submitButtons.length > 0) {
  //     await aui.click().button().withText('Submit').exec();
  //   } else {
  //     await aui.typeIn('askui').textfield().exec();
  //   }
  // })

  askuiIt('should click on "search" icon closest to text "Google"' , async (aui) => {
    await aui.click().icon().withText("search").nearestTo().text().withText("Google").exec();
  });
});

// askuiIt("reproduce-video-problem.ts", async () => {
//   await aui.typeIn("www.google.com").textfield().above().text('Chrome is being controlled by automated test software').exec()
//   await aui.pressKey("enter").exec()
//   await aui.typeIn("www.youtube.com").textfield().above().text('Chrome is being controlled by automated test software').exec()
//   await aui.pressKey("enter").exec()
//   await aui.typeIn("www.ebay.com").textfield().above().text('Chrome is being controlled by automated test software').exec()
//   await aui.pressKey("enter").exec()
//   await aui.typeIn("www.paypal.com").textfield().above().text('Chrome is being controlled by automated test software').exec()
//   await aui.pressKey("enter").exec()
//   await aui.typeIn("www.stripe.com").textfield().above().text('Chrome is being controlled by automated test software').exec()
//   await aui.pressKey("enter").exec()
//   await aui.typeIn("www.yahoo.com").textfield().above().text('Chrome is being controlled by automated test software').exec()
//   await aui.pressKey("enter").exec()
//   await aui.typeIn("www.facebook.com").textfield().above().text('Chrome is being controlled by automated test software').exec()
//   await aui.pressKey("enter").exec()
//   await aui.typeIn("www.linkedin.com").textfield().above().text('Chrome is being controlled by automated test software').exec()
//   await aui.pressKey("enter").exec()
//   await aui.typeIn("www.askui.com").textfield().above().text('Chrome is being controlled by automated test software').exec()
//   await aui.pressKey("enter").exec()
// });
