import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Patch,
} from '@nestjs/common';
import { ReviewService } from './reviews.service';
import { Review } from '../entities/review.entity';
import { Auth } from '../auth/decorators/auth.decorator';
import { ValidRoles } from '../auth/interfaces/valid-roles';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Reviews')
@Controller('reviews')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new review' })
  @ApiResponse({ status: 201, description: 'Review created successfully', type: Review })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @Auth(ValidRoles.admin, ValidRoles.manager, ValidRoles.client)
  async create(@Body() createReviewDto: Partial<Review>): Promise<Review> {
    return this.reviewService.create(createReviewDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all reviews' })
  @ApiResponse({ status: 200, description: 'Return all reviews', type: [Review] })
  @Auth(ValidRoles.admin, ValidRoles.manager, ValidRoles.client)
  async findAll(): Promise<Review[]> {
    return this.reviewService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a review by id' })
  @ApiResponse({ status: 200, description: 'Return the review', type: Review })
  @ApiResponse({ status: 404, description: 'Review not found' })
  @Auth(ValidRoles.admin, ValidRoles.manager, ValidRoles.client)
  async findOne(@Param('id') id: string): Promise<Review> {
    return this.reviewService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a review' })
  @ApiResponse({ status: 200, description: 'Review updated successfully', type: Review })
  @ApiResponse({ status: 404, description: 'Review not found' })
  @Auth(ValidRoles.admin, ValidRoles.manager, ValidRoles.client)
  async update(
    @Param('id') id: string,
    @Body() updateReviewDto: Partial<Review>,
  ): Promise<Review> {
    return this.reviewService.update(id, updateReviewDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a review' })
  @ApiResponse({ status: 200, description: 'Review deleted successfully' })
  @ApiResponse({ status: 404, description: 'Review not found' })
  @Auth(ValidRoles.admin, ValidRoles.manager, ValidRoles.client)
  async remove(@Param('id') id: string): Promise<void> {
    return this.reviewService.remove(id);
  }

  @Patch(':id/assign-order/:orderId')
  @ApiOperation({ summary: 'Assign a review to an order' })
  @ApiResponse({ status: 200, description: 'Review assigned to order successfully', type: Review })
  @ApiResponse({ status: 404, description: 'Review or order not found' })
  @Auth(ValidRoles.admin, ValidRoles.manager, ValidRoles.client)
  async assignReviewToOrder(
    @Param('id') reviewId: string,
    @Param('orderId') orderId: string,
  ): Promise<Review> {
    return this.reviewService.assignReviewToOrder(reviewId, orderId);
  }
}
