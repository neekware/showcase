// disable implicit any for this file
// @ts-nocheck
import * as childProcess from 'child_process';
import * as fs from 'fs';
import * as path from 'path';

const glob = require('glob');

require('dotenv').config();

export const projName = 'showcase';
export const projDir = path.resolve(__dirname, '../../..');
export const readme = path.resolve(path.join(projDir, 'README.md'));
export const coverageDir = path.resolve(path.join(projDir, 'coverage'));
export const srcDir = path.resolve(path.join(projDir, 'src'));
export const pubDir = path.resolve(path.join(projDir, 'public'));
export const distDir = path.resolve(path.join(projDir, 'dist'));
export const projPkgJson = require(path.join(projDir, 'package.json'));

/**
 * Runs a command, capture and return the output
 * @param script {string} an executable command
 */
export function execute(script: string, debug = false): Promise<any> {
  return new Promise((resolvePromise, rejectPromise) => {
    childProcess.exec(
      script,
      { maxBuffer: 1024 * 1000 },
      (error, stdout, stderr) => {
        if (error) {
          console.error(error);
          rejectPromise(stderr);
        } else {
          resolvePromise(stdout);
        }
      }
    );
  });
}

/**
 * Checks if a file exists
 * @param filePath path to file
 */
export function fileExists(filePath: string): boolean {
  try {
    return fs.existsSync(filePath);
  } catch (err) {
    return false;
  }
}

/**
 * Returns a list of file name
 * @param globPattern pattern for globs
 */
export function getGlobFiles(globPattern): Promise<string[]> {
  // /**/error.log, /**/results.txt, ...etc
  return new Promise((resolve, reject) => {
    glob(globPattern, (error, result) => {
      if (error) {
        console.log(error);
        resolve([]);
      }
      resolve(result);
    });
  });
}

/**
 * Writes a file to disk, creating any folders as needed
 * @param filename file name to write to
 * @param content content to write to file
 * @param charset charset to use
 */
export function writeFileSyncRecursive(filename, content, charset) {
  fs.mkdirSync(path.dirname(filename), { recursive: true });
  fs.writeFileSync(filename, content, charset);
}

/**
 * Removes a directory and all its contents
 * @param dirPath path to directory
 * @returns void
 */
export async function removeDirectory(dirPath) {
  try {
    fs.rmSync(dirPath, { recursive: true, force: true });
  } catch (err) {
    console.error(`Error while deleting ${path}.`, err);
  }
}

/**
 * Sleeps for a given amount of time
 * @param ms time to sleep in milliseconds
 * @returns void
 * @example
 * await sleep(1000);
 * console.log('1 second later');
 */
export async function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
