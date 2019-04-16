(function () {
    const API_PET_URL = "https://dog.ceo/api/breeds/image/random";
    const API_BITCOIN_URL = "https://api.blockchain.info/stats";
    const API_SPACEX_URL = "https://api.spacexdata.com/v3/launches/latest?pretty=true"

    onPetButtonClick = async () => {
        const imgPath = await fetchPet();
        changePetImage(imgPath);
    }

    const changePetImage = image => document.getElementById("petImage").src = image;
    const changeTextById = (text, labelId) => document.getElementById(labelId).innerHTML = (text || '').toString();

    const fetchHelper = async (url) => {
        const response = await fetch(url);
        const data = await response.json();

        return data;
    }

    const fetchPet = async () => {
        const data = await fetchHelper(API_PET_URL);
        const { status, message } = data;

        if (status === "success") {
            return message;
        }
    }

    const fetchBitcoinInfo = async () => {
        const data = await fetchHelper(API_BITCOIN_URL);
        const { market_price_usd, hash_rate, difficulty } = data;

        changeTextById(market_price_usd, "bitcoinPrice");
        changeTextById(hash_rate, "bitcoinDifficult");
        changeTextById(difficulty, "bitcoinHashrate");
    }

    const fetchSpaceXLaunchInfo = async () => {
        const data = await fetchHelper(API_SPACEX_URL);
        const { flight_number, mission_name, launch_date_local } = data;

        const launchDate = new Date(launch_date_local);

        changeTextById(flight_number, "flightNumber");
        changeTextById(mission_name, "missionName");
        changeTextById(launchDate.toLocaleDateString(), "launchDate");
    }

    onPetButtonClick();
    fetchSpaceXLaunchInfo();
    setInterval(async () => fetchBitcoinInfo(), 1000);
})();