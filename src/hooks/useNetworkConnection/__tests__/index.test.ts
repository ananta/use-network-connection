import { renderHook } from '@testing-library/react-hooks';
import { useNetworkConnection } from '../index';

describe('useNetworkConnection tests', () => {
  it('should be defined', () => {
    expect(useNetworkConnection).toBeDefined();
  });

  it('renders the hook correctly and checks types', () => {
    const { result } = renderHook(() => useNetworkConnection());
    expect(result.current.isOnline).toBe(true);
    expect(result.current.isSupported).toBe(true);
  });

  // TODO
  // Add tests for network error
});
