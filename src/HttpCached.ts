
import axios from 'axios';

import { createHash } from 'crypto';

import { promises as fs } from 'fs';

export class HttpCached {

    private static readonly directory = "./cache/";

    private static hash(value: string) {
        const shasum = createHash('sha1')
        shasum.update(value);
        return shasum.digest('hex');
    }

    public static async get(url: string) {
        const hash = HttpCached.hash(url);
        const path = HttpCached.directory + hash + ".cache";
        await fs.mkdir(HttpCached.directory, { recursive: true });
        try {
            const buffer = await fs.readFile(path);
            const data = buffer.toString();
            return data;
        }
        catch (e) {
            const response = await axios.get(url);
            const data = response.data;
            try {
                await fs.writeFile(path, data);
            } catch (e) {
                console.error("Could not save", e);
            }
            return data;
        }
    }

}
