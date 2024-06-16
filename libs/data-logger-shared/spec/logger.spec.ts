import { LogLevel } from '../src/logger.model';
import { LoggerService } from '../src/logger.service';

describe('LoggerService', () => {
  let instance: LoggerService;

  beforeEach(() => {
    // Reset singleton instance for each test
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (LoggerService as any).instance = null;
    instance = LoggerService.getInstance();
    console.log = jest.fn();
  });

  it('should return the same instance', () => {
    const instance1 = LoggerService.getInstance();
    const instance2 = LoggerService.getInstance();
    expect(instance1).toBe(instance2);
  });

  it('should set log level', () => {
    instance.setLogLevel(LogLevel.debug);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    expect((instance as any).logLevel).toBe(LogLevel.debug);
  });

  it('should log a critical message', () => {
    console.log = jest.fn();
    instance.critical('Critical error occurred');
    expect(console.log).toHaveBeenCalledWith(
      expect.stringContaining('[CRITICAL]'),
      'color:red',
      'Critical error occurred'
    );
  });

  it('should log an error message', () => {
    console.log = jest.fn();
    instance.error('An error occurred');
    expect(console.log).toHaveBeenCalledWith(
      expect.stringContaining('[ERROR]'),
      'color:OrangeRed',
      'An error occurred'
    );
  });

  it('should log a warning message', () => {
    console.log = jest.fn();
    instance.warn('A warning occurred');
    expect(console.log).toHaveBeenCalledWith(
      expect.stringContaining('[WARN]'),
      'color:orange',
      'A warning occurred'
    );
  });

  it('should log an info message', () => {
    console.log = jest.fn();
    instance.info('Informational message');
    expect(console.log).toHaveBeenCalledWith(
      expect.stringContaining('[INFO]'),
      'color:teal',
      'Informational message'
    );
  });

  it('should log a success message', () => {
    console.log = jest.fn();
    instance.setLogLevel(LogLevel.success);
    instance.success('Success message');
    expect(console.log).toHaveBeenCalledWith(
      expect.stringContaining('[SUCCESS]'),
      'color:green',
      'Success message'
    );
  });

  it('should log a debug message', () => {
    console.log = jest.fn();
    instance.setLogLevel(LogLevel.debug);
    instance.debug('Debug message');
    expect(console.log).toHaveBeenCalledWith(
      expect.stringContaining('[DEBUG]'),
      'color:SlateGrey',
      'Debug message'
    );
  });

  it('should not log debug messages if level is info', () => {
    console.log = jest.fn();
    instance.setLogLevel(LogLevel.info);
    instance.debug('Debug message');
    expect(console.log).not.toHaveBeenCalled();
  });

  it('should log a trace message', () => {
    console.log = jest.fn();
    instance.setLogLevel(LogLevel.trace);
    instance.trace('Trace message');
    expect(console.log).toHaveBeenCalledWith(
      expect.stringContaining('[TRACE]'),
      'color:LightBlue',
      'Trace message'
    );
  });

  it('should not log trace messages if level is info', () => {
    console.log = jest.fn();
    instance.setLogLevel(LogLevel.info);
    instance.trace('Trace message');
    expect(console.log).not.toHaveBeenCalled();
  });

  it('should not log if level is none', () => {
    console.log = jest.fn();
    instance.setLogLevel(LogLevel.none);
    instance.critical('Critical message');
    instance.error('Error message');
    instance.warn('Warning message');
    instance.info('Info message');
    instance.success('Success message');
    instance.debug('Debug message');
    instance.trace('Trace message');
    expect(console.log).not.toHaveBeenCalled();
  });
});
