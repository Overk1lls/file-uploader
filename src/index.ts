import { extractConfig } from './lib/config';
import { createApp } from './middleware/app';
import { FilesRepository } from './repositories/files.repository';
import { AWSS3Service } from './services/aws-s3.service';

export const localConfig = extractConfig();
const { port, ...s3Config } = localConfig;

const filesRepo = new FilesRepository(s3Config);
export const s3Service = new AWSS3Service(filesRepo);

const app = createApp();
app.listen(port, () => console.log(`App is running on port ${port}`));
