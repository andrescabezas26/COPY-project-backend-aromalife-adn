import { Controller, Get, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags, ApiQuery } from '@nestjs/swagger';
import { SpotifyService } from './spotify.service';
import { SpotifySearchResponseDto } from './dto/spotify-search.dto';

@ApiTags('spotify')
@Controller('spotify')
export class SpotifyController {
  constructor(private readonly spotifyService: SpotifyService) {}

  @Get('search')
  @ApiOperation({ summary: 'Search for tracks on Spotify' })
  @ApiQuery({
    name: 'query',
    description: 'Search query for tracks',
    example: 'imagine dragons',
  })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved tracks',
    type: SpotifySearchResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request - query parameter is required',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error',
  })
  async searchTracks(
    @Query('query') query: string,
  ): Promise<SpotifySearchResponseDto> {
    return this.spotifyService.searchTracks(query);
  }
}
