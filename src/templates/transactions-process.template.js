import dayjs from 'dayjs';

const transactionTemplate = (userData, data) => {
  return `<!DOCTYPE html>
  <html lang="es">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Notificacion Administrativa</title>
  </head>
  <body style="font-family: Helvetica, Arial, sans-serif; color: #333333;">
    <div style="padding: 40px 20px; max-width: 600px; margin: auto; background-color: #fff; border-top: 15px solid rgb(110, 255, 180)">
      <div style="font-size: 15px; margin: 5px 0;">
        <span style="font-weight: 600;">Date: </span><span style="font-weight: normal;">
          ${dayjs().format('MM/DD/YYYY')}
        </span>
      </div>

      <h3 style="font-weight: normal; font-size: 20px; margin-button: 0; color: #200944">
        Client information:
      </h3>

      <div style="font-size: 15px; margin: 5px 0;">
        <span style="font-weight: 600;">Nombres: </span><span style="font-weight: normal;">
          ${userData.firstName}
        </span>
      </div>
      <div style="font-size: 15px; margin: 5px 0;">
        <span style="font-weight: 600;">Apellidos: </span><span style="font-weight: normal;">
          ${userData.lastName}
        </span>
      </div>
      
      <div style="font-size: 15px; margin: 5px 0;">
        <span style="font-weight: 600;">Email: </span><span style="font-weight: normal;">
          ${userData.email}
        </span>
      </div>
      
      <div style="font-size: 15px; margin: 5px 0;">
        <span style="font-weight: 600;">Total balance: </span><span style="font-weight: normal;">
          ${data.balance}
        </span>
      </div>
      
      <div style="font-size: 15px; margin: 5px 0;">
        <span style="font-weight: 600;">Transactions: </span><br />
        ${
          data.monthBalance
            ? Object.entries(data.monthBalance)
                .map((d) => {
                  return `<span style="font-weight: normal;">- Number of transactions in ${d[0]}: ${d[1]}</span>`;
                })
                .join('<br />')
            : ''
        }
      </div>
      
      <div style="font-size: 15px; margin: 5px 0;">
        <span style="font-weight: 600;">Average debit amount: </span><span style="font-weight: normal;">
          ${data.debitAmount}
        </span>
      </div>
      
      <div style="font-size: 15px; margin: 5px 0;">
        <span style="font-weight: 600;">Average credit amount: </span><span style="font-weight: normal;">
          ${data.creditAmount}
        </span>
      </div>

      <footer style="font-size: 12px; margin-top: 40px; color: #494949; border-top: 1px solid #cccccc; padding-top: 20px; text-align: center;">
        <div style="display: block; text-align: center; margin-top: 10px;"><img src="https://vorozco-challenges.s3.us-east-1.amazonaws.com/images/stori-logo.png" style="width: 140px; height: auto;" alt="logo asistensi"/></div>
      </footer>
    </div>
  </body>
  </html>`;
};

export default transactionTemplate;
