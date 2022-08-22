// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import request from 'request'
import { json } from 'stream/consumers';


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {

  if(!process.env.SEGMENT_WOKRSPACE_ID){
    res.status(400).send("Missing env var: SEGMENT_WOKRSPACE_ID");
  }
  if(!process.env.SEGMENT_WRITE_KEY){
    res.status(400).send("Missing env var: SEGMENT_WRITE_KEY");
  }
  // res.status(200).json( 
  //   {
  //     SEGMENT_WOKRSPACE_ID : process.env.SEGMENT_WOKRSPACE_ID,
  //     SEGMENT_WRITE_KEY : process.env.SEGMENT_WRITE_KEY
  //   }
  // );

  
    const { email } = req.query;

    var options = {
      'method': 'GET',
      'url': `https://profiles.segment.com/v1/spaces/${process.env.SEGMENT_WOKRSPACE_ID}/collections/users/profiles/email:${email}/traits?limit=200`,
      'headers': {
        'Authorization': `Basic ${ Buffer.from(process.env.SEGMENT_WRITE_KEY + ':').toString('base64') }`
      }
    };

    request(options, function (error, response) {
        if (error) {
            res.status(400).send(error);
        }else{
            var jsonBody = JSON.parse(response.body);

            if(jsonBody["error"]){
              res.status(400).send(jsonBody["error"]);
            }else{
              res.status(200).json( jsonBody.traits);
            }
        }
    });
    
}
