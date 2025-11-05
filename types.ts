
export type AppView = 'generate' | 'edit' | 'analyze';

export type Category = 'Boy' | 'Girl' | 'Couple' | 'Men' | 'Women' | 'Family' | 'Other';

export interface PromptExample {
  prompt: string;
  imageUrl: string;
}

export interface UploadedImage {
  base64: string;
  mimeType: string;
  url: string;
}
