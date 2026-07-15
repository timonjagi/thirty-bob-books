export async function getProducts() {
  if (
    !(
      process.env.GOOGLE_SERVICE_ACCOUNT_CLIENT_EMAIL &&
      process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY &&
      process.env.GOOGLE_SPREADSHEET_ID_PRODUCT
    )
  ) {
    throw new Error(
      'GOOGLE credentials must be set as env vars `GOOGLE_SERVICE_ACCOUNT_CLIENT_EMAIL` ,`GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY` and `GOOGLE_SPREADSHEET_ID_PRODUCT`.'
    );
  }
  const { GoogleSpreadsheet } = require('google-spreadsheet');
  const { getGoogleAccessToken } = require('./google-auth');
  const auth = await getGoogleAccessToken();
  const doc = new GoogleSpreadsheet(process.env.GOOGLE_SPREADSHEET_ID_PRODUCT, auth);
  await doc.loadInfo();
  const sheet = doc.sheetsByIndex[0];
  const rows = await sheet.getRows();
  const products = rows?.map((row) => ({
    id: row.get('id'),
    name: row.get('name'),
    image: row.get('image'),
    description: row.get('description'),
    price: row.get('price'),
    type: row.get('type'),
    quantity: row.get('quantity'),
    dosage: row.get('dosage'),
    substance: row.get('substance'),
    manufacturer: row.get('manufacturer'),
  }));
  return products;
}
