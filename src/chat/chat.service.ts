import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Configuration, OpenAIApi } from 'openai';
import { CreateChatDto } from './dto/create-chat.dto';

@Injectable()
export class ChatService {
  constructor(private configService: ConfigService) {}
  async create(createChatDto: CreateChatDto) {
    const { query } = createChatDto;

    const ApiKey = this.configService.get('OPENAI_APIKEY');

    console.log('request started ...');
    const configuration = new Configuration({
      apiKey: ApiKey,
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
