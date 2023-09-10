import { askuiIt } from './helper/jest.setup';

askuiIt('should do a Google search given a browser with Google Search has already been opened and is focused', async (aui) => {
  await aui.click().text().containsText('Search Google or type a URL').exec();
  await aui.type('askui').exec();
  await aui.pressKey('enter').exec();
  await aui.getAll().exec();
});
