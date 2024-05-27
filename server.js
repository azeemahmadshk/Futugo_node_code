// require('dotenv').config();

import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
console.log("=========================",process.env.API)

debugger;
// require('dotenv-safe').config();
import { dolciTrameIntegration } from './boutiques/dolciTrame.js';
import { lorenzettiIntegration } from './boutiques/lorenzetti.js';

const app = express();
// dotenv.config();
const PORT = process.env.PORT || 3000;

//await dolciTrameIntegration();

await lorenzettiIntegration();

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
