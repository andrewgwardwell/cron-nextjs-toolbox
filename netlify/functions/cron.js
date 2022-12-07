const contentful = require('contentful-management');
// CFPAT-
const ACCESS_TOKEN = production.CNTFL_ACCESS;
const spaceId = 'ii9ehdcj88bc';
const envId = 'andrew-test';

export const handler = async (event) => {
    const client = contentful.createClient({
      // This is the access token for this space. Normally you get the token in the Contentful web app
      accessToken: ACCESS_TOKEN
    });
      // This API call will request a space with the specified ID
    var space = await client.getSpace(spaceId);

    var environment = await space.getEnvironment(envId);

    // Now that we have a space, we can get entries from that space
    const entries = await environment.getEntries({limit: 1, content_type:'learnPage'});
    const entry = entries.items[0];
    const fixedEntry = {
      "sys": {
          "type": "Link",
          "linkType": "Entry",
          "id": "739Yao78oRwksRTUjMtJ6v"
      }
    };
    entry.fields.footerModules["en-US"].splice(0, 0, fixedEntry);
    const updated = await (await entry.update()).publish();

    return {
      statusCode: 200,
      body: JSON.stringify(updated),
    };
}