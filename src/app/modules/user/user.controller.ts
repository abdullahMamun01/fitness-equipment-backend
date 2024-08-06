import httpStatus from 'http-status';
import { catchAsync } from '../../utils/catchAsync';
import { userService } from './user.service';
import sendResponse from '../../utils/sendResponse';

const signupController = catchAsync(async (req, res) => {
  const body = req.body;
  const user = await userService.createUser(body);
  sendResponse(res, {
    success: true,
    message: 'user register successfully',
    statusCode: httpStatus.OK,
    data: user,
  });
});


//update user profile via patch request
const updateProfile = catchAsync(async (req, res) => {
  const body = req.body;
  const user = await userService.updateUser(body , req.user.userId);
  sendResponse(res, {
    success: true,
    message: 'user register successfully',
    statusCode: httpStatus.OK,
    data: user,
  });
});


export const userController = {
  signupController,
  updateProfile

};
