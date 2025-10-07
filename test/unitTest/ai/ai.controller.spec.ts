import { Test, TestingModule } from '@nestjs/testing';
import { AiController } from '../../../src/ai/ai.controller';
import { AiService } from '../../../src/ai/ai.service';
import { PromptDto } from '../../../src/ai/dto/ai.dto';

describe('AiController', () => {
  let controller: AiController;
  let service: AiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AiController],
      providers: [
        {
          provide: AiService,
          useValue: {
            generateText: jest.fn(),
            generateImage: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<AiController>(AiController);
    service = module.get<AiService>(AiService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('generateText', () => {
    it('should call service.generateText with the prompt', async () => {
      const promptDto: PromptDto = { prompt: 'test prompt' };
      const expectedResponse = 'Generated text response';
      jest.spyOn(service, 'generateText').mockResolvedValue(expectedResponse);

      const result = await controller.generateText(promptDto);
      
      expect(service.generateText).toHaveBeenCalledWith(promptDto.prompt);
      expect(result).toEqual({ text: expectedResponse });
    });
  });

  describe('generate', () => {
    it('should call service.generateImage with the prompt', async () => {
      const promptDto: PromptDto = { prompt: 'test prompt' };
      const expectedResponse = 'https://example.com/generated-image.jpg';
      jest.spyOn(service, 'generateImage').mockResolvedValue(expectedResponse);

      const result = await controller.generate(promptDto);
      
      expect(service.generateImage).toHaveBeenCalledWith(promptDto.prompt);
      expect(result).toEqual({ imageUrl: expectedResponse });
    });
  });
});