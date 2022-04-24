import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Index from '@/pages/index';
import { getAllPosts } from '@/lib/postDataProvider';

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
