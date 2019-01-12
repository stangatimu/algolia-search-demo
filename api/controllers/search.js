const algoliasearch = require('algoliasearch'),
      //set aloglia client, pass algolia app ID and API key
      client = algoliasearch(process.env.appId,process.env.apiKey),

      //set the index to search
      index = client.initIndex(process.env.indexName);

exports.products_search = function(req, res){

    //check if search key word is empty and return bad request error
    if(req.query.query == ''){
        return res.status(400).json({
            success: false,
            message:"sorry! found errors on request"
        });
    }
    index.setSettings({
        attributesToHighlight:['name','description']
    });

    //set search params i.e query,page and items per page then
    index.search({
        query: req.query.query,
        page: req.query.page,
        hitsPerPage: parseInt(req.query.per) || 10,
    },

    //search result
    (err,content)=>{
        res.status(200).json({
            success: true,
            content: content,
            search_result: req.query.query            
        });
    }
 );

}