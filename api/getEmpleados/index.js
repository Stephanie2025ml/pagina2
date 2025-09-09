const sql = require('mssql');

module.exports = async function (context, req) {
  const config = {
    server: 'serverone1.database.windows.net',
    database: 'database1',
    options: {
      encrypt: true
    },
    authentication: {
      type: 'azure-active-directory-msi-app',
    }
  };

  try {
    await sql.connect(config);
    const result = await sql.query('SELECT * FROM empleados');
    context.res = {
      status: 200,
      body: result.recordset
    };
  } catch (err) {
    context.res = {
      status: 500,
      body: `Error: ${err.message}`
    };
  }
};