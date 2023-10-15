import { Admin } from '@prisma/client';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { paginationFields } from '../../../constants/pagination';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { AdminFilterAbleFileds } from './admin.constants';
import { AdminService } from './admin.service';

const createAdmin = catchAsync(async (req: Request, res: Response) => {
  const result = await AdminService.createAdmin(req.body);

  sendResponse<Admin>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admin Created Successfully',
    data: result,
  });
});

const getAllAdmin = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, AdminFilterAbleFileds);
  const options = pick(req.query, paginationFields);

  const result = await AdminService.getAllAdmin(filters, options);

  sendResponse<Admin[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admins Retrieved Successfully',
    meta: result.meta,
    data: result.data,
  });
});

const getSingleAdmin = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await AdminService.getSingleAdmin(id);

  sendResponse<Admin>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admin Data Fetched successfully',
    data: result,
  });
});

const updateAdmin = catchAsync(async (req: Request, res: Response) => {
  const result = await AdminService.updateAdmin(req.params.id, req.body);

  sendResponse<Admin>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admin Profile Updated Successfully',
    data: result,
  });
});

const deleteSingleAdmin = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await AdminService.deleteSingleAdmin(id);

  sendResponse<Admin>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admin Deleted successfully',
    data: result,
  });
});

// const getMyProfile = catchAsync(async (req: Request, res: Response) => {
//   const accessToken = req.headers.authorization as string;
//   const decodedToken = jwt.decode(accessToken, { complete: true }) as {
//     payload: JwtPayload;
//   } | null;
//   const id = decodedToken?.payload?.id as string;

//   const result = await AdminService.getMyProfile(id);

//   sendResponse<Admin>(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: 'Your Profile Info Retrieved Successfully',
//     data: result,
//   });
// });

// const updateMyProfile = catchAsync(async (req: Request, res: Response) => {
//   const accessToken = req.headers.authorization as string;
//   const decodedToken = jwt.decode(accessToken, { complete: true }) as {
//     payload: JwtPayload;
//   } | null;
//   const id = decodedToken?.payload?.id as string;

//   const result = await AdminService.updateMyProfile(id, req.body);

//   sendResponse<Admin>(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: 'Your Profile Info Updated Successfully',
//     data: result,
//   });
// });

export const AdminController = {
  createAdmin,
  updateAdmin,
  getAllAdmin,
  getSingleAdmin,
  deleteSingleAdmin,
  // getMyProfile,
  // updateMyProfile,
};
