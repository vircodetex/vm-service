import { Controller, Get } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

@Controller()
export class SchemaController {
    @Get('schema')
    getSchema() {
        const cwd = process.cwd();
        const candidates = [
            path.join(cwd, 'dist', 'openapi.json'),
            path.join(cwd, 'src', 'public', 'openapi.json'),
        ];

        for (const p of candidates) {
            if (fs.existsSync(p)) {
                try {
                    const raw = fs.readFileSync(p, 'utf8');
                    return JSON.parse(raw);
                } catch (e) {
                    return { error: 'failed to read openapi.json', details: (e as Error).message };
                }
            }
        }

        return { error: 'openapi.json not found' };
    }
}
