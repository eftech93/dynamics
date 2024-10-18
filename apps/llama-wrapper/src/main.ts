import express from 'express';
import { Ollama } from 'ollama';
import { CRequest } from './types/request';
import { MessageDTO } from './dtos/MessageDTO';
import { TrainDTO } from './dtos/TrainDTO';
import { batch } from 'ts-utils';

const host = process.env.HOST ?? 'localhost';
const port = process.env.PORT ? Number(process.env.PORT) : 3000;

const llamaHost = process.env.LLAMA_HOST ?? 'localhost';
const llamaPort = process.env.LLAMA_PORT ? Number(process.env.LLAMA_PORT) : 11434;
const MODEL = 'tinyllama';

const app = express();
app.use(express.json())

const ollama = new Ollama({ host: 'http://127.0.0.1:5040' });

app.get('/healthz', (req, res) => {
  res.send({ status: "ok" })
})

app.post('/message', async (req: CRequest<MessageDTO>, res) => {
  const { message } = req.body;
  console.log("Message", message)
  const result = await ollama.chat({
    stream: false,
    model: MODEL,
    messages: [{
      role: 'user',
      content: message
    }]
  })
  res.send({ message: result.message.content })

});

app.post('/train', async (req: CRequest<TrainDTO>, res) => {
  const { messages } = req.body;
  console.log("Message", messages)

  const requests = messages.map((message: string) => ollama.embeddings({ model: MODEL, prompt: message}));
  
  await batch(requests, 5)
  res.send({ status: "ok" });
})

app.listen(port, host, () => {
  console.log(`[ ready ] http://${host}:${port}`);
});
