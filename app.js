const data = require("./email_play.json");
const fs = require("fs");


(() => {
  let list = [];

  for (let i = 0; i < data.length; i++) {
    try {
      const user = {
        "email": data[i]["email"],
        "name": `${data[i]["profile"]["first"]} ${data[i]["profile"]["last"]}`,
      };
      list.push(user);
    } catch (_) {
    }
  }

  const filename = "email-list.json";
  fs.writeFile(filename, JSON.stringify(list), (error) => {
    if (error) {
      console.log("error");
      throw error;
    }
    console.log(`${filename} written.`)
  });
})()