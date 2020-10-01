import { renderHook } from '@testing-library/react-hooks';
import { useEventListener } from '../index';

const mouseMoveEvent = { clientX: 100, clientY: 200 };
let hackHandler: any = null;

const mockElement = {
  addEventListener: (eventName: string, handler: Function) => {
    console.log({ eventName });
    hackHandler = handler;
  },
  removeEventListener: () => {
    hackHandler = null;
  },
  dispatchEvent: (event: Partial<MouseEvent>) => {
    hackHandler(event);
  },
  current: document.createElement('div'),
};

describe('useEventListener tests', () => {
  it('should be defined', () => {
    expect(useEventListener).toBeDefined();
  });

  it('you pass an `eventName`, `handler`, and an `element`', async () => {
    const handler = jest.fn();
    const addEventListenerSpy = jest.spyOn(mockElement.current, 'addEventListener');

    const { waitForNextUpdate } = renderHook(() =>
      useEventListener('foo', handler, mockElement),
    );
    await waitForNextUpdate;
    expect(addEventListenerSpy).toBeCalled();
    addEventListenerSpy.mockRestore();
  });

  // TODO
  // Add more testcases
});
