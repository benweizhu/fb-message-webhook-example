const request = require("request");

const PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN;
const GOOGLE_MAP_API_KEY = process.env.GOOGLE_MAP_API_KEY;

const GOOGLE_MAP_IMAGE = {
  attachment: {
    type: "template",
    payload: {
      template_type: "generic",
      elements: [
        {
          title: "Location Shared By Bot",
          subtitle: "Location Subtitle",
          image_url:
            "https://maps.googleapis.com/maps/api/staticmap?center=Brooklyn+Bridge,New+York,NY&zoom=13&size=600x300&maptype=roadmap&markers=color:blue%7Clabel:S%7C40.702147,-74.015794&markers=color:green%7Clabel:G%7C40.711614,-74.012318&markers=color:red%7Clabel:C%7C40.718217,-73.998284&key=" +
            GOOGLE_MAP_API_KEY
        }
      ]
    }
  }
};

module.exports = {
  callSendAPI: function(sender_psid) {
    let request_body = {
      recipient: {
        id: sender_psid
      },
      message: GOOGLE_MAP_IMAGE
    };

    request(
      {
        uri: "https://graph.facebook.com/v2.6/me/messages",
        qs: {
          access_token: PAGE_ACCESS_TOKEN
        },
        method: "POST",
        json: request_body
      },
      (err, res, body) => {
        if (!err) {
          request(
            {
              uri: "https://graph.facebook.com/v2.6/me/messages",
              qs: {
                access_token: PAGE_ACCESS_TOKEN
              },
              method: "POST",
              json: {
                recipient: {
                  id: sender_psid
                },
                message: {
                  attachment: {
                    type: "template",
                    payload: {
                      template_type: "button",
                      text: "How can I help you?",
                      buttons: [
                        {
                          type: "web_url",
                          url: "https://www.messenger.com",
                          title: "Visit Messenger"
                        }
                      ]
                    }
                  }
                }
              }
            },
            () => {}
          );
        }
      }
    );
  }
};
