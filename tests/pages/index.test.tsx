import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
// Solved by https://github.com/testing-library/jest-dom/issues/45#issuecomment-593561878
import '@testing-library/jest-dom/extend-expect';
import Index from '@/pages/index';
import { getAllPosts } from '@/lib/content-service';

describe('Home', () => {
  it('renders a heading', async () => {
    const allPosts = await getAllPosts(['title', 'date', 'slug', 'author', 'coverImage', 'excerpt']);

    render(<Index allPosts={allPosts} />);

    const heading = screen.getByRole('heading', {
      name: /More Stories/i,
    });

    expect(heading).toBeInTheDocument();
  });
});
