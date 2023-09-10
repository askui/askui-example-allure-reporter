import { askuiIt } from './helper/jest.setup';

askuiIt('should click on "Get Started" button' , async (aui) => {
  await aui.click().button().withText('Get Started').exec();
});
