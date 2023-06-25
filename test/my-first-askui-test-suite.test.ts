import { aui } from './helper/jest.setup';

describe('jest with askui', () => {
  xit('should generate an annotation', async () => {
    await aui.annotate();
  });

  xit('should do a Google search given a browser with Google Search has already been opened and is focused', async () => {
    await aui.click().text().containsText('Search Google or type a URL').exec();
    await aui.type('askui').exec();
    await aui.pressKey('enter').exec();
    await aui.getAll().exec();
  });

  xit('should open the spotlight given it is running on Mac OS', async () => {
    await aui.pressTwoKeys('command', 'space').exec();
    await aui.type('askui', {isSecret: true}).exec();
  })

  it('should click on "Submit" button if it is found, otherwise type something in closest text field', async () => {
    const submitButtons = await aui.get().button().withText('Submit').exec();
    if (submitButtons.length > 0) {
      await aui.click().button().withText('Submit').exec();
    } else {
      await aui.typeIn('askui').textfield().exec();
    }
  })

  it('should click on "search" icon closest to text "Google"' , async () => {
    await aui.click().icon().withText("search").nearestTo().text().withText("Google").exec();
  });
});
