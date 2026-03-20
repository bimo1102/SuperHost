const params = `?version=${new Date().getTime()}`;
const path = require('path');
const nodeEnv = process.env.NODE_ENV;
require('dotenv').config({
    path: path.resolve(process.cwd(), `.env.${nodeEnv}`),
});
module.exports = {
    moduleName: 'host',
    remotes: {
        globalModule: `globalModule@${process.env.GLOBAL_MFE_URL}/remoteEntry.js${params}`,
        crmModule: `crmModule@${process.env.CRM_MFE_URL}/remoteEntry.js${params}`,
    },
};
