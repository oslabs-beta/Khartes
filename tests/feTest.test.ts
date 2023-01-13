import { render, screen } from '@testing-library/react';
import Visualization  from '../client/components/Visualization';

// we may need other imports depending on what we end up doing - maybe even additional dependencies
// maybe we need to e need to type visualization?

describe("Create alert tests", () => {
    test('testing x in Visualization component', () => {
      render(<Visualization>);
    });
})