import { extractConfig } from './lib/config';
import { createApp } from './middleware/app';
import { AWSS3Service } from './services/aws-s3.service';

export const localConfig = extractConfig();
export const s3Service = new AWSS3Service(localConfig);

const app = createApp();
app.listen(3000, () => console.log('App is running on port 3000'));
