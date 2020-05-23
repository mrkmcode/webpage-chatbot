const diaglogflow = require('dialogflow');
const config = require('../config/keys');

// Create a new session
const sessionClient = new diaglogflow.SessionsClient();
const sessionPath = sessionClient.sessionPath(config.googleProjectID, config.dialogFlowSessionID);

module.exports = app => {
    app.get('/', (req, res) => {
        res.send({'hello':'rohit'});
    });
    
    app.post('/api/df_text_query', async (req, res) => {
        // The text query request
        const request = {
            session: sessionPath,
            queryInput: {
                text: {
                    // The query to send to the dialogflow agent
                    text: req.body.text,
                    // The language used by the client (en-US)
                    languageCode: config.dialogFlowSessionLanguageCode,
                },
            },
        };

        const responses = await sessionClient.detectIntent(request);
        console.log('Detected intent');
        const result = responses[0].queryResult;
        console.log(result);
    });
    
    app.get('/api/df_event_query', (req, res) => {
        res.send({'do':'event_query'});
    });
}