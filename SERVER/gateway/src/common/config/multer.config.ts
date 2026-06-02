// import { diskStorage } from 'multer';
// import path from 'node:path';
// import { randomUUID } from 'node:crypto';
// import { BadRequestException } from '@nestjs/common';
//
// export const MulterOptions = {
//   storage: diskStorage({
//     destination: './uploads',
//
//     filename: (req, file, callback) => {
//       console.log(req.user);
//       const ext: string = path.extname(file.originalname);
//
//       callback(null, `${randomUUID()}${ext}`);
//     },
//   }),
//
//   limits: {
//     fileSize: 10 * 1024 * 1024,
//   },
//
//   fileFilter: (
//     req: any,
//     file: any,
//     callback: (error: Error | null, status: boolean) => void,
//   ) => {
//     if (file) callback(null, true);
//     else {
//       callback(new BadRequestException('File not found'), false);
//     }
//   },
// };
