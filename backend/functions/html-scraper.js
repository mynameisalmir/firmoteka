const DynamoDB = require("aws-sdk/clients/dynamodb");
const DocumentClient = new DynamoDB.DocumentClient();
const axios = require("axios");
const queryString = require("qs");

exports.handler = async (event) => {
  // Parsiraj json dobijen iz requesta
  let request = JSON.parse(event.body);

  // Pripremi podatke za slanje axiosom
  let config = setupAxios(request);

  // Posalji zahtjev
  var response = await axios(config);
  let sliced = response.data;

  // Ako ne dobijes podatke o licima prekini izvrsavanje lambde
  if (sliced.indexOf("podaciLica") == -1 || sliced.indexOf("[[") == -1) {
    return {
      status: 404,
      body: JSON.stringify({ message: "There is no data for scraping" }),
    };
  }

  // Formiraj niz od dobijenih podataka i odradi eval kako bi od stringa napravio niz
  sliced = sliced.slice(sliced.indexOf("[["));
  sliced = eval(sliced.substring(0, sliced.indexOf("]];")) + "]];");

  // Proslijedi dobijeni niz funkciji koja ce spremiti podatke za DynamoDB
  let sendData = {
    RequestItems: {
      "dev-firmoteka-companies": prepareData(sliced),
    },
  };

  let res = await DocumentClient.batchWrite(sendData).promise();

  return {
    status: 200,
    body: JSON.stringify(res),
  };
};

function prepareData(array) {
  array = array.splice(0, 25)
  var fullDateArr = new Date().toISOString().split("T");
  const creationTime = fullDateArr[0] + " " + fullDateArr[1].split(".")[0];
  let arrayToSend = [];

  array.forEach((element) => {
    let newData = {
      PutRequest: {
        Item: {
          reg_num: element[1] ? element[1] : 'NULL',
          pib: element[3] ? element[3] : 'NULL',
          org_type: element[4] ? element[4] : 'NULL',
          full_name: element[5] ? element[5] : 'NULL',
          activity: element[6] ? element[6] : 'NULL',
          activity_code: element[7] ? element[7] : 'NULL',
          country: element[8] ? element[8] : 'NULL',
          est_date: element[9] ? element[9] : 'NULL',
          status: element[11] ? element[11] : 'NULL',
          adress: "HERCEGOVACKI PUT BROJ 5",
          authorized_represent: "MARKO MARKOVIC",
          ceo: "JANKO JANKOVIC",
          email: "email@example.com",
          founder: "MIRKO MIRKOVIC",
          phone: "+38268771111",
          post_address: "81000",
          short_name: element[5] ? element[5] : 'NULL',
          web_address: "www.website.com",
          created_at: creationTime,
          updated_at: creationTime,
        },
      },
    };

    arrayToSend.push(newData);
  });

  return arrayToSend;
}

function setupAxios(request) {
  var data = queryString.stringify({
    selectedTab: request.selectedTab,
    urmasica: request.urmasica,
    NAZIV_DRUSTVA_brzo: request.NAZIV_DRUSTVA_brzo,
    REG_BR_brzo: request.REG_BR_brzo,
    PIB_brzo: request.PIB_brzo,
    JMBG_brzo: request.JMBG_brzo,
    NAZIV_DRUSTVA: request.NAZIV_DRUSTVA,
    REG_BROJ: request.REG_BROJ,
    PIB: request.PIB,
    SIFRA_DJELATNOSTI: request.SIFRA_DJELATNOSTI,
    ID_PRIVREDNE_DJELATNOSTI: request.ID_PRIVREDNE_DJELATNOSTI,
    OPSTINA_SJEDISTE: request.OPSTINA_SJEDISTE,
    STATUS_DRUSTVA: request.STATUS_DRUSTVA,
    DATUM_REGISTRACIJE_PROMJENE: request.DATUM_REGISTRACIJE_PROMJENE,
    LICE: request.LICE,
    JMBG: request.JMBG,
    PRIKAZATI: request.PRIKAZATI,
    SORTIRANJE: request.SORTIRANJE,
    BROJ_PREDMETA: request.BROJ_PREDMETA,
    DATUM_PRIJEMA: request.DATUM_PRIJEMA,
  });

  var config = {
    method: "post",
    url: "http://www.pretraga.crps.me:8083/Home/TraziSubmit",
    headers: {
      Connection: "keep-alive",
      "Cache-Control": "max-age=0",
      "Upgrade-Insecure-Requests": "1",
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.93 Safari/537.36",
      Origin: "http://www.pretraga.crps.me:8083",
      "Content-Type": "application/x-www-form-urlencoded",
      Accept:
        "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
      Referer: "http://www.pretraga.crps.me:8083/Home/TraziSubmit",
      "Accept-Language": "en-US,en;q=0.9",
      Cookie: "ASP.NET_SessionId=" + request.SessionId,
    },
    data: data,
  };

  return config;
}
