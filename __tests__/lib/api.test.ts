import { generateSlug } from '@/lib/api';

describe('api', () => {
    
    const acutal = generateSlug('_posts', '_posts/preview.md');
    it(`slug should be 'preivew'`, () => {
        expect(acutal).toBe('preview');
      });
  })