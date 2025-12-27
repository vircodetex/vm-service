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
    // Write into dist for builds
    const distDir = path.join(process.cwd(), 'dist');
    if (!fs.existsSync(distDir)) {
        fs.mkdirSync(distDir, { recursive: true });
    }
    const distOutPath = path.join(distDir, 'openapi.json');
    fs.writeFileSync(distOutPath, JSON.stringify(document, null, 2));
    // Also write into src/public so it persists during start:dev
    const publicDir = path.join(process.cwd(), 'src', 'public');
    if (!fs.existsSync(publicDir)) {
        fs.mkdirSync(publicDir, { recursive: true });
    }
    const publicOutPath = path.join(publicDir, 'openapi.json');
    fs.writeFileSync(publicOutPath, JSON.stringify(document, null, 2));
    // eslint-disable-next-line no-console
    console.log('Wrote', distOutPath, 'and', publicOutPath);
    await app.close();
}

main().catch((e) => {
    // eslint-disable-next-line no-console
    console.error(e);
    process.exit(1);
});
