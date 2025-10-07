import { Test, TestingModule } from '@nestjs/testing';
import { AiService } from '../../../src/ai/ai.service';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import { HttpException, InternalServerErrorException } from '@nestjs/common';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('AiService', () => {
  let service: AiService;
  let configService: ConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AiService,
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn((key: string) => {
              const env = {
                GEMINI_API_KEY: 'test-key',
                GEMINI_API_URL: 'https://gemini.api',
                HUGGING_FACE_API_KEY: 'hf-key',
                IMAGE_API_URL: 'https://image.api',
              };
              return env[key];
            }),
          },
        },
      ],
    }).compile();

    service = module.get<AiService>(AiService);
    configService = module.get<ConfigService>(ConfigService);
  });

  describe('generateText', () => {
    it('should return text from Gemini API', async () => {
      mockedAxios.post.mockResolvedValue({
        data: {
          candidates: [
            {
              content: {
                parts: [{ text: 'Test response' }],
              },
            },
          ],
        },
      });

      const result = await service.generateText('Hello');
      expect(result).toBe('Test response');
    });

    it('should throw specific error message if API responds with error', async () => {
      mockedAxios.post.mockRejectedValue({
        response: {
          status: 400,
          data: {
            error: 'Invalid request format',
          },
        },
      });

      await expect(service.generateText('bad prompt')).rejects.toThrow(
        new HttpException('Invalid request format', 400),
      );
    });

    it('should throw default message if no error detail is returned', async () => {
      mockedAxios.post.mockRejectedValue({
        response: {
          status: 500,
          data: {},
        },
      });

      await expect(service.generateText('bad prompt')).rejects.toThrow(
        new HttpException('Failed to generate text from Gemini API', 500),
      );
    });

    it('should throw internal error if no response is returned', async () => {
      mockedAxios.post.mockRejectedValue(new Error('Network error'));

      await expect(service.generateText('prompt')).rejects.toThrow(
        new InternalServerErrorException('Failed to generate text due to a server issue'),
      );
    });
  });

  describe('generateImage', () => {
    it('should return image URL from API', async () => {
      mockedAxios.post.mockResolvedValue({
        data: {
          images: ['https://image.url/test.png'],
        },
      });

      const result = await service.generateImage('A cat');
      expect(result).toBe('https://image.url/test.png');
    });

    it('should throw 400 BadRequestException', async () => {
      mockedAxios.post.mockRejectedValue({
        isAxiosError: true,
        response: {
          status: 400,
        },
      });

      await expect(service.generateImage('bad')).rejects.toThrow('An unexpected error occurred while generating the image.');
    });

    it('should throw InternalServerErrorException when no image returned', async () => {
      mockedAxios.post.mockResolvedValue({
        data: {
          images: [],
        },
      });

      await expect(service.generateImage('no image')).rejects.toThrow(
        new InternalServerErrorException('An unexpected error occurred while generating the image.'),
      );
    });

    it('should throw ServiceUnavailable if no response', async () => {
      mockedAxios.post.mockRejectedValue({
        isAxiosError: true,
      });

      await expect(service.generateImage('fail')).rejects.toThrow(
        'An unexpected error occurred while generating the image.',
      );
    });
  });
});
