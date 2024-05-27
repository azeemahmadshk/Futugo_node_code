import dotenv from 'dotenv';
import { fetchPost } from '../integrations/xmag/integrations/fetchPost.js';
import { updateQuantities } from '../integrations/xmag/integrations/updateQuantity.js';
dotenv.config();

const webkulAPI = process.env.API;
const dolciTrameWebkulKey = process.env.DOLCITRAMEWEBKUL;
const dolciKey = process.env.DOLCITRAMEKEY;
const dolciAPI = process.env.DOLCITRAMEAPI;

const dolciTrameIntegration = async () => {
  await fetchPost(dolciKey, dolciAPI, webkulAPI, dolciTrameWebkulKey);
  // await updateQuantities(dolciKey, dolciAPI, webkulAPI, dolciTrameWebkulKey);
};

export { dolciTrameIntegration };
