import { describe, expect, it } from 'vitest';
import { intentDestination, intentEnvironment } from '@/lib/onboarding';
describe('Entry choices', () => {
  it('takes learning to the learning dashboard', () => { expect(intentDestination('learn')).toBe('/dashboard'); expect(intentEnvironment('learn')).toBe('learn'); });
  it('takes independent experiments directly to labs', () => { expect(intentDestination('experiment')).toBe('/labs'); expect(intentEnvironment('experiment')).toBe('create'); });
  it('takes engineering projects directly to projects', () => { expect(intentDestination('project')).toBe('/projects'); expect(intentEnvironment('project')).toBe('create'); });
  it('takes AI assistance to the planning workspace', () => { expect(intentDestination('assistance')).toBe('/planner'); expect(intentEnvironment('assistance')).toBe('create'); });
});