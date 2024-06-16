import { LogColors, LogLevel, LogNames } from './logger.model';

export class LoggerService {
  private static instance: LoggerService | null = null;

  private constructor(private logLevel: LogLevel = LogLevel.info) {}

  static getInstance(): LoggerService {
    if (!LoggerService.instance) {
      LoggerService.instance = new LoggerService();
    }
    return LoggerService.instance;
  }

  setLogLevel(level: LogLevel) {
    this.logLevel = level;
  }

  critical(message: unknown, ...extras: unknown[]) {
    this.doLog(LogLevel.critical, message, extras);
  }

  error(message: unknown, ...extras: unknown[]) {
    this.doLog(LogLevel.error, message, extras);
  }

  warn(message: unknown, ...extras: unknown[]) {
    this.doLog(LogLevel.warn, message, extras);
  }

  info(message: unknown, ...extras: unknown[]) {
    this.doLog(LogLevel.info, message, extras);
  }

  success(message: unknown, ...extras: unknown[]) {
    this.doLog(LogLevel.success, message, extras);
  }

  debug(message: unknown, ...extras: unknown[]) {
    this.doLog(LogLevel.debug, message, extras);
  }

  trace(message: unknown, ...extras: unknown[]) {
    this.doLog(LogLevel.trace, message, extras);
  }

  private get time() {
    return new Date().toISOString();
  }

  private doLog(level: LogLevel, message: unknown, extras: unknown[] = []) {
    if (
      !message ||
      level === LogLevel.none ||
      level > this.logLevel ||
      this.logLevel === LogLevel.none
    ) {
      return;
    }

    const color = LogColors[level];
    console.log(`%c${this.time} [${LogNames[level]}]`, `color:${color}`, message, ...extras);
  }
}

export const logger = LoggerService.getInstance();
