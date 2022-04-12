import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

export const corsOptions: CorsOptions = {
  origin: (origin, callback) => {
    const whitelists = process.env.ORIGIN_WHITELISTS.split(',');

    if (
      !origin ||
      whitelists.some((whitelist) =>
        RegExp(`^https?://${whitelist}`).test(origin),
      )
    ) {
      callback(null, true);
    } else callback(new Error('Not Allowed by CORS'));
  },
};
