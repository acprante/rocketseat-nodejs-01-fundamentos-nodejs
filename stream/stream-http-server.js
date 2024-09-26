import http from 'node:http';
import fs from 'node:fs';
import { parse } from 'csv-parse';

const filePath = new URL('../task-list.csv', import.meta.url);
const stream = fs.createReadStream(filePath);

const csvParse = parse({
    delimiter: ',',
    skipEmptyLines: true,
    fromLine: 2 // skip the header line
});

const server = http.createServer( async(req, res) => {

    const linesParse = stream.pipe(csvParse);

    for await (const csvLine of linesParse){
        const [title, description] = csvLine;

        await fetch('http://localhost:3333/tasks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                title,
                description,
            }),
        })
    }
    
    return res.writeHead(200).end();

});

server.listen(3334);
