import { log } from './log';

jest.spyOn(global.console, 'log');

describe('@repo/ag-logger', () => {
  it('prints a message', () => {
    log('hello');
    // eslint-disable-next-line no-console -- testing console
    expect(console.log).toBeCalledWith('LOGGER: ', 'hello');
  });
});
