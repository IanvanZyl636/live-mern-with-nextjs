import express from 'express'
import next from 'next';

const dev = process.env.NODE_ENV !== 'production'
const port = process.env.PORT || 4000
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare()
    .then(() => {
        const server = express()

        server.get('/api/*', (req, res) => {

            res.send('Hello')
        });

        server.get('/protected/*',()=>{}, (req, res) => {
            return handle(req, res)
        });

        server.listen(port, () => {
            console.log(`> Ready on http://localhost:${port}`)
        });
    })
    .catch((ex) => {
        console.error(ex.stack)
        process.exit(1)
    })