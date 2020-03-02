const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

var params = {
    currency: 'USD',
    ta: urlParams.get('adults'),
    o1: urlParams.get('origin_iata'),
    d1: urlParams.get('destination_iata'),
    dd1: moment( urlParams.get('depart_date') ).format('YYYY-MM-DD'),
    dd2: moment( urlParams.get('return_date') ).format('YYYY-MM-DD')
};

console.log(params);

var settings = {
	async: true,
	crossDomain: true,
	url: "https://tripadvisor1.p.rapidapi.com/flights/create-session",
	method: "GET",
	headers: {
		"x-rapidapi-host": "tripadvisor1.p.rapidapi.com",
		"x-rapidapi-key": "2008df76d6mshe2ded84278db1dap19c503jsndb61034ad5f0"
  },
  data: params
}

$.ajax(settings).done(function (response) {
	console.log(response);
});