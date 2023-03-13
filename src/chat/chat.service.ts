import { Injectable } from '@nestjs/common';
import { Configuration, OpenAIApi } from 'openai';
import { CreateChatDto } from './dto/create-chat.dto';

@Injectable()
export class ChatService {
  async create(createChatDto: CreateChatDto) {
    const { query } = createChatDto;

    console.log('request started ...');
    const configuration = new Configuration({
      apiKey: process.env.OPENAI_APIKEY,
    });
    const openai = new OpenAIApi(configuration);
    const completion = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      temperature: 0.7,
      max_tokens: 100,
      messages: query,
    });
    console.log({
      completion,
      choices: completion.data.choices,
      usage: completion.data.usage.total_tokens,
    });
    return completion.data.choices[0].message;
  }
}
