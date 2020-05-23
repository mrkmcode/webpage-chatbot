const chatbot = require('../chatbot');

module.exports = app => {
    app.get('/', (req, res) => {
        res.send({'hello':'rohit'});
    });
    
    app.post('/api/df_text_query', async (req, res) => {
        let responses = await chatbot.textQuery(req.body.text, req.body.params);   
        const result = responses[0].queryResult;
        
        res.send(result);
    });
    
    app.post('/api/df_event_query', async (req, res) => {
        let responses = await chatbot.eventQuery(req.body.event, req.body.params);   
        const result = responses[0].queryResult;
        
        res.send(result);
    });
}