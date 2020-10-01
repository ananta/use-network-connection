export interface IConnection {
  isSupported: boolean;
}

export interface IConnectionStatus extends IConnection {
  downlink?: number;
  downlinkMax?: number;
  effectiveType?: '2g' | '3g' | '4g' | 'slow-2g';
  type?:
    | 'bluetooth'
    | 'cellular'
    | 'ethernet'
    | 'mixed'
    | 'none'
    | 'other'
    | 'unknown'
    | 'wifi'
    | 'wimax';
  rtt?: number;
  saveData?: boolean;
  isOnline?: boolean;
  since: number;
}

export const initialConnection = {
  isSupported: false,
  downlink: undefined,
  downlinkMax: undefined,
  effectiveType: undefined,
  type: undefined,
  rtt: undefined,
  saveData: undefined,
  isOnline: true,
  since: new Date().getTime(),
  addEventListener: () => false,
  removeEventListener: () => false,
};

export const getNavigator = () => {
  if (!navigator) {
    return undefined;
  } else {
    return {
      ...navigator.connection,
      isOnline: navigator.onLine,
    };
  }
};

export const getConnectionInfo = (): IConnection | IConnectionStatus => {
  const navigator = <IConnectionStatus | undefined>getNavigator();
  if (!navigator) {
    return {
      isSupported: false,
      isOnline: false,
    };
  }
  const { isOnline, downlink, downlinkMax, effectiveType, type, rtt, saveData } =
    navigator || initialConnection;

  return {
    isSupported: true,
    downlink,
    downlinkMax,
    effectiveType,
    type,
    rtt,
    saveData,
    isOnline,
  };
};

interface IConnectionChange {
  setConnection: React.Dispatch<React.SetStateAction<IConnectionStatus>>;
  isOnline: boolean;
}

export const handleConnectionEvent = ({
  setConnection,
  isOnline,
}: IConnectionChange) => {
  setConnection((connection: IConnectionStatus) => ({
    ...connection,
    isOnline,
    since: new Date().getTime(),
  }));
};

export const handleConnectionOnline = ({
  setConnection,
}: Omit<IConnectionChange, 'isOnline'>) => {
  handleConnectionEvent({
    setConnection,
    isOnline: true,
  });
};

export const handleConnectionOffline = ({
  setConnection,
}: Omit<IConnectionChange, 'isOnline'>) => {
  handleConnectionEvent({
    setConnection,
    isOnline: false,
  });
};

export const handleConnectionChange = ({
  setConnection,
}: Omit<IConnectionChange, 'isOnline'>) => {
  setConnection((connection) => ({
    ...connection,
    ...getConnectionInfo(),
  }));
};
