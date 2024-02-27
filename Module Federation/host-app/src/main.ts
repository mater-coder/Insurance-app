import('./bootstrap')
  .catch(err => console.error(err));

if (typeof Worker !== 'undefined') {
  // Create a new instance of the web worker
  const worker = new Worker('../ngsw-worker.ts', { type: 'module' });

  // Communicate with the worker
  worker.onmessage = ({ data }) => {
    console.log('Data from web worker:', data);
    // Process the data received from the web worker
  };

  // Example of sending a message to the worker
  worker.postMessage('fetchData');
} else {
  // Web Workers are not supported in this environment
  // Handle the case where Web Workers are not available
  console.error('Web Workers are not supported in this environment');
}
