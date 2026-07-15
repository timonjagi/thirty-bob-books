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
  const { JWT } = require('google-auth-library');
  let privateKey = process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY;
  
  console.log('KEY RAW first20:', JSON.stringify(privateKey.substring(0, 20)));
  console.log('KEY RAW last20:', JSON.stringify(privateKey.substring(privateKey.length - 20)));
  console.log('KEY RAW length:', privateKey.length);
  console.log('KEY has \\n:', privateKey.includes('\\n'));
  console.log('KEY has newline:', privateKey.includes('\n'));
  console.log('KEY has \\r:', privateKey.includes('\\r'));
  
  if (!privateKey.includes('\n')) {
    const body = privateKey
      .replace('-----BEGIN PRIVATE KEY-----', '')
      .replace('-----END PRIVATE KEY-----', '')
      .replace(/\\n/g, '')
      .trim();
    privateKey = `-----BEGIN PRIVATE KEY-----\n${body}\n-----END PRIVATE KEY-----\n`;
  }
  
  console.log('KEY AFTER first50:', JSON.stringify(privateKey.substring(0, 50)));
  console.log('KEY AFTER length:', privateKey.length);
  
  const serviceAccountAuth = new JWT({
    email: process.env.GOOGLE_SERVICE_ACCOUNT_CLIENT_EMAIL,
    key: privateKey,
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });
  const doc = new GoogleSpreadsheet(process.env.GOOGLE_SPREADSHEET_ID_ORDER, serviceAccountAuth);
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
