import { aui } from './helper/jest.setup';

it('should click on "Get Started" button (file-2, 1)' , async () => {
  await aui.click().button().withText('Get Started').exec();
});

it('should click on "Get Started" button (file-2, 2)' , async () => {
  await aui.click().button().withText('Get Started').exec();
});
