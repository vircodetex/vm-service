import { NestFactory } from '@nestjs/core';
import { AppModule } from '../src/app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as fs from 'fs';
import * as path from 'path';

async function main() {
    const pkgPath = path.join(process.cwd(), 'package.json');
    const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));

    const app = await NestFactory.create(AppModule, { logger: false });
    const config = new DocumentBuilder()
        .setTitle(pkg.name || 'vm-service')
        .setDescription(pkg.description || '')
        .setVersion(pkg.version || '1.0.0')
        .build();

    const document = SwaggerModule.createDocument(app, config);
    const outPath = path.join(process.cwd(), 'openapi.json');
    fs.writeFileSync(outPath, JSON.stringify(document, null, 2));
    // eslint-disable-next-line no-console
    console.log('Wrote', outPath);
    await app.close();
}

main().catch((e) => {
    // eslint-disable-next-line no-console
    console.error(e);
    process.exit(1);
});
