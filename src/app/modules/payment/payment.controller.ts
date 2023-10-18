import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';

const makePayment = catchAsync(async (req: Request, res: Response) => {
  const accessToken = req.headers.authorization as string;
  const decodedToken = jwt.decode(accessToken, { complete: true }) as {
    payload: JwtPayload;
  } | null;
  const authUserId = decodedToken?.payload?.id as string;

  const result = await PaymentmentService.makePayment(authUserId, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Payment Completed Successfully',
    data: result,
  });
});

export const PaymentController = {
  makePayment,
};
