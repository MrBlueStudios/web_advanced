const { XMLHttpRequest } = require('xmlhttprequest');

function oldschoolAJAX() {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://jsonplaceholder.typicode.com/todos/1', true);
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        console.log('Legacy AJAX response:', xhr.responseText);
      } else {
        console.error(`Error: ${xhr.status}`);
      }
    }
  };
  xhr.send();
}

function fetchWithCallbacks(url, cb) {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', url, true);

  xhr.onreadystatechange = function () {
    if (xhr.readyState !== 4) {
      return;
    }

    if (xhr.status >= 200 && xhr.status < 300) {
      cb(null, {
        status: xhr.status,
        body: xhr.responseText,
        headers: xhr.getAllResponseHeaders(),
      });
    } else {
      cb(new Error(`Request failed with status ${xhr.status}`));
    }
  };

  xhr.onerror = function () {
    cb(new Error('Network error while performing request.'));
  };

  xhr.send();
}

function fetchWithPromise(url) {
  return new Promise((resolve, reject) => {
    fetchWithCallbacks(url, (err, result) => {
      if (err) {
        reject(err);
        return;
      }
      try {
        const parsedBody = JSON.parse(result.body);
        resolve({ ...result, data: parsedBody });
      } catch (parseError) {
        resolve(result);
      }
    });
  });
}

async function fetchWithAsync(url) {
  return fetchWithPromise(url);
}

module.exports = {
  oldschoolAJAX,
  fetchWithCallbacks,
  fetchWithPromise,
  fetchWithAsync,
};

if (require.main === module) {
  const demoUrl = 'https://jsonplaceholder.typicode.com/todos/1';
  console.log('Running callback-based request...');
  fetchWithCallbacks(demoUrl, (err, result) => {
    if (err) {
      console.error('Callback error:', err.message);
      return;
    }
    console.log('Callback result:', result.status);
  });

  fetchWithPromise(demoUrl)
    .then((result) => {
      console.log('Promise result:', result.data);
    })
    .catch((err) => {
      console.error('Promise error:', err.message);
    });

  (async () => {
    try {
      const result = await fetchWithAsync(demoUrl);
      console.log('Async/await result:', result.data);
    } catch (err) {
      console.error('Async/await error:', err.message);
    }
  })();
}
