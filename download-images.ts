import fs from 'fs';
import path from 'path';
import axios, { AxiosResponse } from 'axios';
import * as cheerio from 'cheerio';
import { URL } from 'url';

// The directory where images will be saved
const downloadDir: string = 'downloaded-images';

/**
 * Downloads a single image from a given URL and saves it to a specified folder.
 * @param {string} imageUrl The URL of the image to download.
 * @param {string} folderPath The path to the folder where the image will be saved.
 * @returns {Promise<void>}
 */
const downloadImage = async (imageUrl: string, folderPath: string): Promise<void> => {
  try {
    const response: AxiosResponse<NodeJS.ReadableStream> = await axios({
      method: 'get',
      url: imageUrl,
      responseType: 'stream',
    });

    const imageName: string = path.basename(new URL(imageUrl).pathname);
    const localPath: string = path.join(folderPath, imageName);

    const writer: fs.WriteStream = fs.createWriteStream(localPath);
    response.data.pipe(writer);

    return new Promise((resolve, reject) => {
      writer.on('finish', resolve);
      writer.on('error', reject);
    });
  } catch (error: any) {
    console.error(`Failed to download image ${imageUrl}: ${error.message}`);
  }
};

/**
 * Main function to scrape a URL for images and download them.
 * @param {string} pageUrl The URL of the page to scrape.
 * @returns {Promise<void>}
 */
const scrapeAndDownload = async (pageUrl: string): Promise<void> => {
  try {
    // Create the download directory if it doesn't exist
    if (!fs.existsSync(downloadDir)) {
      fs.mkdirSync(downloadDir);
      console.log(`Created directory: ${downloadDir}`);
    }

    console.log(`Fetching HTML from ${pageUrl}...`);
    const { data: html }: AxiosResponse<string> = await axios.get(pageUrl);
    const $: cheerio.CheerioAPI = cheerio.load(html);

    const imageUrls: string[] = [];
    $('img').each((index: number, element) => {
      const imgSrc: string | undefined = $(element as any).attr('src');
      if (imgSrc) {
        // Resolve the image URL to an absolute path
        const absoluteImgUrl: string = new URL(imgSrc, pageUrl).href;
        imageUrls.push(absoluteImgUrl);
      }
    });

    if (imageUrls.length === 0) {
      console.log('No images found on the page.');
      return;
    }

    console.log(`Found ${imageUrls.length} images. Starting download...`);

    for (const imageUrl of imageUrls) {
      console.log(`Downloading ${imageUrl}`);
      await downloadImage(imageUrl, downloadDir);
    }

    console.log('\nAll images have been downloaded successfully!');
  } catch (error: any) {
    console.error(`An error occurred: ${error.message}`);
  }
};

// --- Script Execution ---

// Get the URL from the command-line arguments
const targetUrl: string | undefined = process.argv[2];

if (!targetUrl) {
  console.log('Please provide a URL as a command-line argument.');
  console.log('Example: npx ts-node download-images.ts http://example.com');
} else {
  scrapeAndDownload(targetUrl);
}