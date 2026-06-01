import { diskStorage } from 'multer';
import path from 'node:path';
import { randomUUID } from 'node:crypto';

export const MulterOptions = {
  storage: diskStorage({
    destination: '../../../uploads',

    filename: (req, file, callback) => {
      const ext: string = path.extname(file.originalname);

      callback(null, `${randomUUID()}${ext}`);
    },
  }),
};
