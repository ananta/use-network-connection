# 📡 useNetworkConnection()

useNetworkConnectio() is a custom React hook that let's you know if the network connection status of the client application.
(submit a [issue](https://github.com/ananta/use-network-connection/issues?q=is%3Aissue+is%3Aopen+sort%3Aupdated-desc) or PR!).

## Usage

Add it to your project:

```console
yarn add use-network-connection
```

Use it in your React app:

```jsx
// App.js

import React from 'react';
import { useNetworkConnection } from 'use-network-connection';

function App() {
  const connection = useNetworkConnection();
  return (
    <>
      <h1>Wallet</h1>
      {connection.isOnline ? (
        <div>
          <p>Your connection is online!</p>
        </div>
      ) : (
        <div>
          <p>Your connection is offline!</p>
        </div>
      )}
    </>
  );
}
```

### useNetworkConnection()

It returns an object representing the connection information. The connection oject is extended form of [Navigator Object](https://developer.mozilla.org/en-US/docs/Web/API/Window/navigator):

Some of the custom properties of the connection object are:

- `isOnline`: Provides `true` when connected to the internet, or `false` when disconnected
- `since`: Time since the connection change (UNIX epoch time) in `number`
- `isSupported`: Provides `true` when the device has network support, or `false` when there isn't

And these values are from Navigator Object itself

- `downlink`: number | undefined
- `downlinkMax`: number | undefined
- `effectiveType`: '2g' | '3g' | '4g' | 'slow-2g' | undefined
- `type`: | 'bluetooth' | 'cellular' | 'ethernet' | 'mixed' | 'none' | 'other' | 'unknown' | 'wifi' | 'wimax' | undefined
- `rtt`: number | undefined
- `saveData`: boolean | undefined
