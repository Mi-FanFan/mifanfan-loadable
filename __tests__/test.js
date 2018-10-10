const React = require('react')
const renderer = require('react-test-renderer')
const Loadable = require('../src').default

const MyComponent = {
  default(props) {
    return <div>MyComponent {JSON.stringify(props)}</div>;
  }
}

function waitFor(delay) {
  return new Promise(resolve => {
    setTimeout(resolve, delay);
  });
}

function MyLoadingComponent(props) {
  return <div>MyLoadingComponent {JSON.stringify(props)}</div>;
}

function createLoader(delay, loader, error) {
  return () => {
    return waitFor(delay).then(() => {
      if (loader) {
        return loader();
      } else {
        throw error;
      }
    });
  };
}

test('loading success', async () => {
  let LoadableMyComponent = Loadable({
    loader: createLoader(400, () => MyComponent),
    loading: MyLoadingComponent
  });

  let component1 = renderer.create(<LoadableMyComponent prop="foo" />);

  expect(component1.toJSON()).toMatchSnapshot(); // initial
  await waitFor(200);
  expect(component1.toJSON()).toMatchSnapshot(); // loading
  await waitFor(300);
  expect(component1.toJSON()).toMatchSnapshot(); // loaded

});



test('loading error', async () => {
  let LoadableMyComponent = Loadable({
    loader: createLoader(400, undefined, 3),
    loading: MyLoadingComponent
  });

  let component1 = renderer.create(<LoadableMyComponent prop="foo" />);

  expect(component1.toJSON()).toMatchSnapshot(); // initial
  await waitFor(200);
  expect(component1.toJSON()).toMatchSnapshot(); // loading
  await waitFor(300);
  expect(component1.toJSON()).toMatchSnapshot(); // loaded

});



