const { WebClient } = require('@slack/web-api');
const axios = require('axios').default;
const images = {
  "morning": "Morning.png",
  "afternoon": "ProfilePic.png",
  "night": "Nightime.png"
} 
async function setPFP() {
  var hour = new Date().getHours() + 8
  let image
  if (5 < hour && hour < 12) {
    image = await axios.get(images.morning, {
      responseType: "arraybuffer",
    });
  }
  else if (12 < hour && hour < 20) {
    image = await axios.get(images.afternoon, {
      responseType: "arraybuffer",
    });
  }
  else {
    image = await axios.get(images.night, {
      responseType: "arraybuffer",
    });
  }
  const client = new WebClient();
  const slackRequest = await client.users.setPhoto({
    image: image.data,
    token: process.env.SLACK_TOKEN
  });
}

setPFP()