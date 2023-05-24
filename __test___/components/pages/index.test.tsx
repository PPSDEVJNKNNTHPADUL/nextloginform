import React from 'react';
import { render } from '@testing-library/react';
import HomePage from '@/pages/index';

describe('HomePage', () => {
  it('renders without crashing', () => {
    const { getByText } = render(<HomePage />);
    const titleElement = getByText('Serendipitous Snaps');
    expect(titleElement).toBeInTheDocument();
  });
});
 