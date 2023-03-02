import axios from "axios";
import * as cheerio from "cheerio";

export const get_data_winners = async(req, res) => {
    let result = [];
    await axios({
        method: "GET",
        url: "https://www.tuazar.com/loteria/animalitos/resultados/",
        headers: {
            'Accept-Encoding': 'application/json',
        }
    })
    .then( res => {
        const $ = cheerio.load(res.data);
        $('.resultados:eq(1) .resultado .col-xs-6').each((i, el) => {
            let img_alt = $(el).find('div img').attr('alt');
            let hour = $(el).find('div .horario span').text();
            result.push({img_alt, hour});
        });
    } )
    .catch(err => {
        result = err;
    })
    res.json(result);
}