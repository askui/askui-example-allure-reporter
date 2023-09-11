import { aui } from './helper/jest.setup';

it('should click on "Get Started" button (file-1, 1)' , async () => {
  await aui.click().button().withText('Get Started').exec();
});

it('should click on "Get Started" button (file-1, 2)' , async () => {
  await aui.click().button().withText('Get Started').exec();
});
