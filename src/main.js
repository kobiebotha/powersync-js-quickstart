import './style.css'
import javascriptLogo from './javascript.svg'
import viteLogo from '/vite.svg'
import { setupCounter } from './counter.js'

import { column, Schema, Table, PowerSyncDatabase } from '@powersync/web';
import Logger from 'js-logger';

const counters = new Table({ count: column.integer, floatcount: column.real, created_at: column.text })
const AppSchema = new Schema({ counters });

export const db = new PowerSyncDatabase({
  schema: AppSchema,
  database: {
    dbFilename: 'powersync.db'
  }
});

Logger.useDefaults();
Logger.setLevel(Logger.DEBUG);

if (process.env.NODE_ENV === 'development') {
  window.db = db;
}

document.querySelector('#app').innerHTML = `
  <div>
    <a href="https://vite.dev" target="_blank">
      <img src="${viteLogo}" class="logo" alt="Vite logo" />
    </a>
    <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank">
      <img src="${javascriptLogo}" class="logo vanilla" alt="JavaScript logo" />
    </a>
    <h1>Hello Vite!</h1>
    <div class="card">
      <button id="counter" type="button"></button>
    </div>
    <p class="read-the-docs">
      Click on the Vite logo to learn more
    </p>
  </div>
`

setupCounter(document.querySelector('#counter'))