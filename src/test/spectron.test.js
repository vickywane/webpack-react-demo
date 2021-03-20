import { Application } from 'spectron';
import path from 'path';
import electron from 'electron';
import assert from 'assert';

describe('Application launch', function() {
  const App = new Application({
    path: electron,

    args: [path.join(__dirname, '..', '..')],
  });

  beforeAll(function() {
    return App.start();
  }, 50000);

  afterEach(function() {
    if (App && App.isRunning()) {
      return App.stop();
    }
  });

  it('shows an initial window', function() {
    return App.client.getWindowCount().then(function(count) {
      assert.equal(count, 1);
    });
  });
});
