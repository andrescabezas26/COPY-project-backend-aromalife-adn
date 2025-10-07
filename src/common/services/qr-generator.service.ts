import { Injectable } from '@nestjs/common';
import * as QRCode from 'qrcode';

@Injectable()
export class QrGeneratorService {
  /**
   * Generates a QR code buffer that points to the candle experience page
   * @param candleId - The ID of the candle
   * @param baseUrl - The base URL from the request (e.g., 'http://localhost:3000' or production URL)
   * @returns Buffer containing the QR code PNG image
   */
  async generateCandleQR(
    candleId: string,
    baseUrl: string = process.env.FRONTEND_URL ||
      process.env.FRONTEND_URL_QR ||
      'http://localhost:3000',
  ): Promise<Buffer> {
    try {
      // Create the URL that the QR code will point to
      const qrUrl = `${baseUrl}/candle/${candleId}`;

      console.log('Generating QR code for URL:', qrUrl);

      // Generate QR code as PNG buffer
      const qrOptions = {
        type: 'png' as const,
        width: 300,
        margin: 2,
        color: {
          dark: '#000000',
          light: '#FFFFFF',
        },
        errorCorrectionLevel: 'M' as const,
      };

      const qrBuffer = await QRCode.toBuffer(qrUrl, qrOptions);

      console.log(
        'QR code generated successfully, buffer size:',
        qrBuffer.length,
      );

      return qrBuffer;
    } catch (error) {
      console.error('Error generating QR code:', error);
      throw new Error(`Failed to generate QR code: ${error.message}`);
    }
  }

  /**
   * Generates a QR code data URL for preview purposes
   * @param candleId - The ID of the candle
   * @param baseUrl - The base URL from the request
   * @returns Data URL string of the QR code
   */
  async generateCandleQRDataUrl(
    candleId: string,
    baseUrl: string = process.env.FRONTEND_URL || 'http://localhost:3000',
  ): Promise<string> {
    try {
      const qrUrl = `${baseUrl}/candle/${candleId}`;

      const qrDataUrl = await QRCode.toDataURL(qrUrl, {
        width: 300,
        margin: 2,
        color: {
          dark: '#000000',
          light: '#FFFFFF',
        },
        errorCorrectionLevel: 'M',
      });

      return qrDataUrl;
    } catch (error) {
      console.error('Error generating QR code data URL:', error);
      throw new Error(`Failed to generate QR code data URL: ${error.message}`);
    }
  }
}
