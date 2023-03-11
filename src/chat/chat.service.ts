import { Injectable } from '@nestjs/common';
import { Configuration, OpenAIApi } from 'openai';
import { CreateChatDto } from './dto/create-chat.dto';
import { UpdateChatDto } from './dto/update-chat.dto';

@Injectable()
export class ChatService {
  async create(createChatDto: CreateChatDto) {
    const { query } = createChatDto;

    console.log('request started ...');
    const configuration = new Configuration({
      apiKey: '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',
    });
    const openai = new OpenAIApi(configuration);

    const completion = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      temperature: 0.7,
      messages: [
        {
          role: 'system',
          content:
            'you are a helpful assistant senior software engineer peer programming and assisting other engineers, ensuring they understand the code that they write and re-write it more efficiently',
        },
        { role: 'user', content: `Help me understand this code : ${query}` },
      ],
    });
    console.log(completion);
    return completion.data.choices[0].message;
  }
}
