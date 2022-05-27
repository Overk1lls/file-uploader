import { extractConfig } from './lib/config';
import { createApp } from './middleware/app';
import { AWSS3Service } from './services/aws-s3.service';


export const localConfig = extractConfig();
const { port, ...s3Config } = localConfig;

export const s3Service = new AWSS3Service(s3Config);

const app = createApp();
app.listen(port, () => console.log(`App is running on port ${port}`));
