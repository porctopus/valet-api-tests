const { Command } = require("commander");
const program = new Command();
const axios = require("axios").default;

let total = 0
let days = 0

async function getData(config) {
  return await axios(config).then(response => {return response.data})
}

program
  .name("avg-conversion-rate")
  .description("find the average conversion rate for two currencies over the last n weeks")
  .version("0.0.1");

// define the parameters
program.command("avg")
  .description("output the avg conversion rate for two specified currencies (eg. AUD, USD, CAD) over the last n weeks")
  .argument("<original>", "original currency")
  .argument("<converted>", "conversion currency")
  .argument("<w>", "number of weeks to average conversion rate")
  .action((original, converted, w) => {
    // retrieve the user requested values and calculate the average
    const o = original.toUpperCase()
    const c = converted.toUpperCase()
    let fx = `FX${o}${c}`
    let config = {
      method: "get",
      url: `https://www.bankofcanada.ca/valet/observations/${fx}/json`,
      params: {
         "recent_weeks": `${w}`
      }
    }
    getData(config)
    .then(res => {
      days = res.observations.length
      for (const o of res.observations) {
        total += Number(o[fx].v)        
      }
      average = total/days
      console.log(`The average conversion rate for ${o} to ${c} over the last ${w} weeks is ${average}`)
    });
  })
program.parse();