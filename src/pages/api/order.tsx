async function createOrder(data) {
  if (
    !(
      process.env.GOOGLE_SERVICE_ACCOUNT_CLIENT_EMAIL &&
      process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY &&
      process.env.GOOGLE_SPREADSHEET_ID_ORDER
    )
  ) {
    throw new Error(
      'GOOGLE credentials must be set as env vars `GOOGLE_SERVICE_ACCOUNT_CLIENT_EMAIL` ,`GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY` and `GOOGLE_SPREADSHEET_ID_ORDER`.'
    );
  }

  const { GoogleSpreadsheet } = require('google-spreadsheet');
  const { getGoogleAccessToken } = require('../../helpers/google-auth');
  const auth = await getGoogleAccessToken();
  const doc = new GoogleSpreadsheet(process.env.GOOGLE_SPREADSHEET_ID_ORDER, auth);
  await doc.loadInfo();
  const sheet = doc.sheetsByIndex[0];

  await sheet.addRow(JSON.parse(data));
}
export default async (req, res) => {
  const { method } = req;
  if (method === 'POST') {
    await createOrder(req.body);
    res.status(200).json({ message: `successfully added new order` });
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).json({ message: `Method ${method} Not Allowed` });
  }
};
