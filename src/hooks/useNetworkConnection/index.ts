import { useState, useEffect } from 'react';

import { useEventListener } from '../useEventListener';
import {
  handleConnectionChange,
  handleConnectionOffline,
  handleConnectionOnline,
  initialConnection,
} from '../../helpers/connectionHelper';

import type { IConnectionStatus } from '../../helpers/connectionHelper';

export const useNetworkConnection = () => {
  const [connection, setConnection] = useState<IConnectionStatus>(initialConnection);

  const connectionIsOnline = () => handleConnectionOnline({ setConnection });
  const connectionIsOffline = () => handleConnectionOffline({ setConnection });
  const connectionChange = () => handleConnectionChange({ setConnection });

  useEventListener('online', connectionIsOnline);
  useEventListener('offline', connectionIsOffline);
  useEventListener('change', connectionChange);

  useEffect(() => {
    connectionChange();
  }, []);

  return connection;
};
