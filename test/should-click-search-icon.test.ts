import { askuiIt } from './helper/jest.setup';

askuiIt('should click on "search" icon closest to text "Google"' , async (aui) => {
  await aui.click().icon().withText("search").nearestTo().text().withText("Google").exec();
});
