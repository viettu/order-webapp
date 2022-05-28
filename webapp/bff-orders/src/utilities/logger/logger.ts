export class Logger {
  // TODO: should implement the log method later
  log(message: string, level: 'info' | 'warn' | 'error' = 'info') {
    console.log(`${level}: ${message}`);
  }
}

export default Logger;
