import { Controller, Post, Body } from '@nestjs/common';
import { AiService } from './ai.service';
import { Auth } from '../auth/decorators/auth.decorator';
import { ValidRoles } from '../auth/interfaces/valid-roles';
import { PromptDto } from './dto/ai.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('AI')
@Controller('ai')
export class AiController {
  constructor(private readonly aiService: AiService) {}

  @Post('generate-text')
  @ApiOperation({ summary: 'Generate text using AI' })
  @ApiResponse({ status: 201, description: 'Text generated successfully' })
  async generateText(@Body() promptDto: PromptDto) {
    const text = await this.aiService.generateText(promptDto.prompt);
    return { text };
  }

  @Post('generate-image')
  @ApiOperation({ summary: 'Generate image using AI' })
  @ApiResponse({ status: 201, description: 'Image generated successfully' })
  @Auth(ValidRoles.admin, ValidRoles.manager, ValidRoles.client)
  async generate(@Body() promptDto: PromptDto) {
    const imageUrl = await this.aiService.generateImage(promptDto.prompt);
    return { imageUrl };
  }
}
