// import Canvas from './Canvas'
import { useState, useRef, useEffect, useCallback } from 'react'
import { Grid, } from '@mui/material'

export default function MaCanvas() {
	const returnObj = {
    "Meta Data": {
        "1. Information": "Daily Prices (open, high, low, close) and Volumes",
        "2. Symbol": "IBM",
        "3. Last Refreshed": "2021-12-09 16:00:01",
        "4. Output Size": "Compact",
        "5. Time Zone": "US/Eastern"
    },
    "Time Series (Daily)": {
        "2021-12-09": {
            "1. open": "122.1500",
            "2. high": "123.9500",
            "3. low": "121.7900",
            "4. close": "123.5700",
            "5. volume": "4597102"
        },
        "2021-12-08": {
            "1. open": "122.0000",
            "2. high": "123.3800",
            "3. low": "121.5200",
            "4. close": "123.0200",
            "5. volume": "5483948"
        },
        "2021-12-07": {
            "1. open": "120.4750",
            "2. high": "122.0800",
            "3. low": "120.0700",
            "4. close": "121.5800",
            "5. volume": "5193991"
        },
        "2021-12-06": {
            "1. open": "119.4000",
            "2. high": "121.1500",
            "3. low": "119.4000",
            "4. close": "119.9100",
            "5. volume": "4785560"
        },
        "2021-12-03": {
            "1. open": "117.3600",
            "2. high": "119.3600",
            "3. low": "117.3600",
            "4. close": "118.8400",
            "5. volume": "6630139"
        },
        "2021-12-02": {
            "1. open": "117.3700",
            "2. high": "117.9800",
            "3. low": "116.5600",
            "4. close": "116.9000",
            "5. volume": "5267149"
        },
        "2021-12-01": {
            "1. open": "118.2500",
            "2. high": "118.9300",
            "3. low": "116.8500",
            "4. close": "116.9200",
            "5. volume": "5959867"
        },
        "2021-11-30": {
            "1. open": "117.5000",
            "2. high": "119.2399",
            "3. low": "116.4500",
            "4. close": "117.1000",
            "5. volume": "9252701"
        },
        "2021-11-29": {
            "1. open": "118.6200",
            "2. high": "119.6100",
            "3. low": "117.5300",
            "4. close": "118.5000",
            "5. volume": "8949795"
        },
        "2021-11-26": {
            "1. open": "115.0000",
            "2. high": "116.3350",
            "3. low": "114.5600",
            "4. close": "115.8100",
            "5. volume": "3322012"
        },
        "2021-11-24": {
            "1. open": "116.1600",
            "2. high": "117.2700",
            "3. low": "116.0800",
            "4. close": "116.7300",
            "5. volume": "3220802"
        },
        "2021-11-23": {
            "1. open": "116.7900",
            "2. high": "117.9400",
            "3. low": "116.0400",
            "4. close": "116.7900",
            "5. volume": "4914995"
        },
        "2021-11-22": {
            "1. open": "116.0000",
            "2. high": "118.8100",
            "3. low": "115.1900",
            "4. close": "116.4700",
            "5. volume": "6417218"
        },
        "2021-11-19": {
            "1. open": "116.4900",
            "2. high": "116.5600",
            "3. low": "115.2700",
            "4. close": "116.0500",
            "5. volume": "5384548"
        },
        "2021-11-18": {
            "1. open": "118.3600",
            "2. high": "118.3600",
            "3. low": "116.3100",
            "4. close": "116.6600",
            "5. volume": "5047879"
        },
        "2021-11-17": {
            "1. open": "118.3800",
            "2. high": "119.3300",
            "3. low": "117.7800",
            "4. close": "118.0600",
            "5. volume": "4043289"
        },
        "2021-11-16": {
            "1. open": "118.9200",
            "2. high": "119.9000",
            "3. low": "118.4200",
            "4. close": "118.4600",
            "5. volume": "4750760"
        },
        "2021-11-15": {
            "1. open": "119.5400",
            "2. high": "120.1600",
            "3. low": "118.3100",
            "4. close": "118.8700",
            "5. volume": "5046321"
        },
        "2021-11-12": {
            "1. open": "120.0000",
            "2. high": "120.6400",
            "3. low": "118.7800",
            "4. close": "118.9600",
            "5. volume": "5376966"
        },
        "2021-11-11": {
            "1. open": "120.9000",
            "2. high": "121.7894",
            "3. low": "120.0800",
            "4. close": "120.2700",
            "5. volume": "4643257"
        },
        "2021-11-10": {
            "1. open": "121.0000",
            "2. high": "122.4300",
            "3. low": "119.9320",
            "4. close": "120.2200",
            "5. volume": "6268961"
        },
        "2021-11-09": {
            "1. open": "122.5600",
            "2. high": "122.9000",
            "3. low": "120.2600",
            "4. close": "120.8500",
            "5. volume": "7195453"
        },
        "2021-11-08": {
            "1. open": "123.9850",
            "2. high": "124.7800",
            "3. low": "123.5300",
            "4. close": "124.5400",
            "5. volume": "5625275"
        },
        "2021-11-05": {
            "1. open": "121.4300",
            "2. high": "123.7700",
            "3. low": "121.4300",
            "4. close": "123.6100",
            "5. volume": "6790478"
        },
        "2021-11-04": {
            "1. open": "123.0500",
            "2. high": "123.3400",
            "3. low": "119.9000",
            "4. close": "120.8500",
            "5. volume": "7208736"
        },
        "2021-11-03": {
            "1. open": "126.2300",
            "2. high": "127.2900",
            "3. low": "125.6800",
            "4. close": "127.1300",
            "5. volume": "5421406"
        },
        "2021-11-02": {
            "1. open": "126.3000",
            "2. high": "127.1700",
            "3. low": "124.9100",
            "4. close": "126.1800",
            "5. volume": "4496393"
        },
        "2021-11-01": {
            "1. open": "125.0500",
            "2. high": "126.3100",
            "3. low": "123.8375",
            "4. close": "126.2800",
            "5. volume": "5874767"
        },
        "2021-10-29": {
            "1. open": "125.4300",
            "2. high": "126.3200",
            "3. low": "124.9100",
            "4. close": "125.1000",
            "5. volume": "5916789"
        },
        "2021-10-28": {
            "1. open": "125.1700",
            "2. high": "126.3100",
            "3. low": "124.6200",
            "4. close": "125.8400",
            "5. volume": "6503003"
        },
        "2021-10-27": {
            "1. open": "127.4400",
            "2. high": "127.8800",
            "3. low": "125.0100",
            "4. close": "125.1700",
            "5. volume": "6973432"
        },
        "2021-10-26": {
            "1. open": "127.5200",
            "2. high": "128.3000",
            "3. low": "126.7550",
            "4. close": "127.1300",
            "5. volume": "8520872"
        },
        "2021-10-25": {
            "1. open": "127.5300",
            "2. high": "128.6500",
            "3. low": "126.9400",
            "4. close": "127.6400",
            "5. volume": "6374038"
        },
        "2021-10-22": {
            "1. open": "128.0500",
            "2. high": "130.2500",
            "3. low": "126.6110",
            "4. close": "127.8800",
            "5. volume": "11582195"
        },
        "2021-10-21": {
            "1. open": "133.5100",
            "2. high": "133.7200",
            "3. low": "128.1000",
            "4. close": "128.3300",
            "5. volume": "31466529"
        },
        "2021-10-20": {
            "1. open": "141.6800",
            "2. high": "142.2000",
            "3. low": "140.7000",
            "4. close": "141.9000",
            "5. volume": "6189255"
        },
        "2021-10-19": {
            "1. open": "141.0800",
            "2. high": "142.9400",
            "3. low": "140.5201",
            "4. close": "141.9800",
            "5. volume": "4339548"
        },
        "2021-10-18": {
            "1. open": "144.0000",
            "2. high": "144.9400",
            "3. low": "141.7590",
            "4. close": "142.3200",
            "5. volume": "6154055"
        },
        "2021-10-15": {
            "1. open": "143.3900",
            "2. high": "144.8500",
            "3. low": "142.7900",
            "4. close": "144.6100",
            "5. volume": "3222778"
        },
        "2021-10-14": {
            "1. open": "141.0400",
            "2. high": "143.9200",
            "3. low": "141.0100",
            "4. close": "143.3900",
            "5. volume": "4217305"
        },
        "2021-10-13": {
            "1. open": "140.5200",
            "2. high": "141.4100",
            "3. low": "139.6600",
            "4. close": "140.7600",
            "5. volume": "2880747"
        },
        "2021-10-12": {
            "1. open": "142.2100",
            "2. high": "142.3000",
            "3. low": "140.3000",
            "4. close": "140.4700",
            "5. volume": "3148559"
        },
        "2021-10-11": {
            "1. open": "143.5000",
            "2. high": "144.0800",
            "3. low": "142.4000",
            "4. close": "142.4300",
            "5. volume": "2793298"
        },
        "2021-10-08": {
            "1. open": "141.8100",
            "2. high": "143.6500",
            "3. low": "141.0500",
            "4. close": "143.2200",
            "5. volume": "3731279"
        },
        "2021-10-07": {
            "1. open": "142.7300",
            "2. high": "143.3950",
            "3. low": "141.5300",
            "4. close": "141.8100",
            "5. volume": "3823803"
        },
        "2021-10-06": {
            "1. open": "142.4800",
            "2. high": "143.3700",
            "3. low": "140.8900",
            "4. close": "142.3600",
            "5. volume": "5328433"
        },
        "2021-10-05": {
            "1. open": "144.7500",
            "2. high": "145.0000",
            "3. low": "142.6400",
            "4. close": "143.1500",
            "5. volume": "6976648"
        },
        "2021-10-04": {
            "1. open": "142.7400",
            "2. high": "146.0000",
            "3. low": "142.3501",
            "4. close": "144.1100",
            "5. volume": "7351128"
        },
        "2021-10-01": {
            "1. open": "141.0000",
            "2. high": "143.9700",
            "3. low": "140.3700",
            "4. close": "143.3200",
            "5. volume": "6604064"
        },
        "2021-09-30": {
            "1. open": "140.0000",
            "2. high": "140.5700",
            "3. low": "138.5000",
            "4. close": "138.9300",
            "5. volume": "5824431"
        },
        "2021-09-29": {
            "1. open": "137.7300",
            "2. high": "139.9300",
            "3. low": "136.4400",
            "4. close": "139.1800",
            "5. volume": "3774236"
        },
        "2021-09-28": {
            "1. open": "139.1700",
            "2. high": "139.6880",
            "3. low": "137.2100",
            "4. close": "137.4700",
            "5. volume": "4314595"
        },
        "2021-09-27": {
            "1. open": "137.9600",
            "2. high": "139.0650",
            "3. low": "137.4800",
            "4. close": "138.5600",
            "5. volume": "3306865"
        },
        "2021-09-24": {
            "1. open": "137.0300",
            "2. high": "138.4800",
            "3. low": "136.7500",
            "4. close": "137.4900",
            "5. volume": "2964397"
        },
        "2021-09-23": {
            "1. open": "135.2500",
            "2. high": "137.4200",
            "3. low": "135.0300",
            "4. close": "136.7300",
            "5. volume": "3013238"
        },
        "2021-09-22": {
            "1. open": "133.7200",
            "2. high": "135.3700",
            "3. low": "133.4700",
            "4. close": "134.6300",
            "5. volume": "3602416"
        },
        "2021-09-21": {
            "1. open": "135.1100",
            "2. high": "135.6500",
            "3. low": "132.9400",
            "4. close": "132.9700",
            "5. volume": "4074528"
        },
        "2021-09-20": {
            "1. open": "133.9000",
            "2. high": "135.1800",
            "3. low": "132.7800",
            "4. close": "134.3100",
            "5. volume": "4770651"
        },
        "2021-09-17": {
            "1. open": "135.7500",
            "2. high": "135.9199",
            "3. low": "135.0500",
            "4. close": "135.2300",
            "5. volume": "5633480"
        },
        "2021-09-16": {
            "1. open": "137.2800",
            "2. high": "137.9500",
            "3. low": "135.7100",
            "4. close": "136.4300",
            "5. volume": "2643975"
        },
        "2021-09-15": {
            "1. open": "136.2200",
            "2. high": "137.8000",
            "3. low": "135.6700",
            "4. close": "137.2000",
            "5. volume": "3254122"
        },
        "2021-09-14": {
            "1. open": "138.4000",
            "2. high": "138.5700",
            "3. low": "135.3400",
            "4. close": "136.2200",
            "5. volume": "4454291"
        },
        "2021-09-13": {
            "1. open": "138.4000",
            "2. high": "138.9900",
            "3. low": "137.5100",
            "4. close": "138.1500",
            "5. volume": "4144345"
        },
        "2021-09-10": {
            "1. open": "138.8200",
            "2. high": "139.3699",
            "3. low": "137.0000",
            "4. close": "137.0200",
            "5. volume": "3975115"
        },
        "2021-09-09": {
            "1. open": "137.8500",
            "2. high": "138.9600",
            "3. low": "137.5550",
            "4. close": "137.7400",
            "5. volume": "3508363"
        },
        "2021-09-08": {
            "1. open": "138.1400",
            "2. high": "139.0900",
            "3. low": "137.6000",
            "4. close": "138.6700",
            "5. volume": "2985409"
        },
        "2021-09-07": {
            "1. open": "139.6500",
            "2. high": "139.7900",
            "3. low": "137.7614",
            "4. close": "138.0600",
            "5. volume": "3285363"
        },
        "2021-09-03": {
            "1. open": "139.6800",
            "2. high": "140.4700",
            "3. low": "139.3000",
            "4. close": "139.5800",
            "5. volume": "1924215"
        },
        "2021-09-02": {
            "1. open": "139.7200",
            "2. high": "140.0500",
            "3. low": "139.0300",
            "4. close": "140.0100",
            "5. volume": "2715659"
        },
        "2021-09-01": {
            "1. open": "139.9800",
            "2. high": "140.0699",
            "3. low": "139.1900",
            "4. close": "139.3000",
            "5. volume": "2474544"
        },
        "2021-08-31": {
            "1. open": "139.5400",
            "2. high": "140.9400",
            "3. low": "138.9500",
            "4. close": "140.3400",
            "5. volume": "4235101"
        },
        "2021-08-30": {
            "1. open": "139.5000",
            "2. high": "139.8800",
            "3. low": "138.8150",
            "4. close": "138.9700",
            "5. volume": "1995526"
        },
        "2021-08-27": {
            "1. open": "138.7100",
            "2. high": "139.5850",
            "3. low": "138.4000",
            "4. close": "139.4100",
            "5. volume": "2459643"
        },
        "2021-08-26": {
            "1. open": "139.9700",
            "2. high": "140.8000",
            "3. low": "138.7100",
            "4. close": "138.7800",
            "5. volume": "2498915"
        },
        "2021-08-25": {
            "1. open": "139.9200",
            "2. high": "140.8000",
            "3. low": "139.4600",
            "4. close": "139.8600",
            "5. volume": "2012817"
        },
        "2021-08-24": {
            "1. open": "139.7800",
            "2. high": "140.2300",
            "3. low": "139.3200",
            "4. close": "139.8400",
            "5. volume": "2365638"
        },
        "2021-08-23": {
            "1. open": "139.6200",
            "2. high": "140.1500",
            "3. low": "138.8000",
            "4. close": "139.6200",
            "5. volume": "3039587"
        },
        "2021-08-20": {
            "1. open": "137.7400",
            "2. high": "139.3800",
            "3. low": "137.2700",
            "4. close": "139.1100",
            "5. volume": "2657763"
        },
        "2021-08-19": {
            "1. open": "138.6900",
            "2. high": "139.4500",
            "3. low": "137.2100",
            "4. close": "138.0200",
            "5. volume": "4160129"
        },
        "2021-08-18": {
            "1. open": "141.6700",
            "2. high": "141.9150",
            "3. low": "139.3900",
            "4. close": "139.4700",
            "5. volume": "3510694"
        },
        "2021-08-17": {
            "1. open": "143.0000",
            "2. high": "143.1600",
            "3. low": "141.0900",
            "4. close": "142.4200",
            "5. volume": "3074078"
        },
        "2021-08-16": {
            "1. open": "143.2300",
            "2. high": "143.7400",
            "3. low": "142.2300",
            "4. close": "143.5900",
            "5. volume": "2786343"
        },
        "2021-08-13": {
            "1. open": "142.6400",
            "2. high": "143.5800",
            "3. low": "142.4400",
            "4. close": "143.1800",
            "5. volume": "1908951"
        },
        "2021-08-12": {
            "1. open": "142.2600",
            "2. high": "143.1500",
            "3. low": "142.0766",
            "4. close": "143.0700",
            "5. volume": "2089418"
        },
        "2021-08-11": {
            "1. open": "141.7800",
            "2. high": "142.7685",
            "3. low": "141.5000",
            "4. close": "142.1300",
            "5. volume": "4259952"
        },
        "2021-08-10": {
            "1. open": "141.2100",
            "2. high": "141.8110",
            "3. low": "140.3400",
            "4. close": "141.3800",
            "5. volume": "5299869"
        },
        "2021-08-09": {
            "1. open": "142.2000",
            "2. high": "142.4950",
            "3. low": "140.9700",
            "4. close": "141.2500",
            "5. volume": "4904065"
        },
        "2021-08-06": {
            "1. open": "143.0000",
            "2. high": "144.3900",
            "3. low": "142.8900",
            "4. close": "144.0900",
            "5. volume": "3826835"
        },
        "2021-08-05": {
            "1. open": "143.0300",
            "2. high": "143.4100",
            "3. low": "142.2200",
            "4. close": "142.7700",
            "5. volume": "2757389"
        },
        "2021-08-04": {
            "1. open": "143.8000",
            "2. high": "144.1800",
            "3. low": "142.4700",
            "4. close": "142.7600",
            "5. volume": "2830079"
        },
        "2021-08-03": {
            "1. open": "141.9000",
            "2. high": "144.7000",
            "3. low": "141.6500",
            "4. close": "144.0700",
            "5. volume": "4084724"
        },
        "2021-08-02": {
            "1. open": "141.4500",
            "2. high": "143.0600",
            "3. low": "141.0300",
            "4. close": "141.4200",
            "5. volume": "2929540"
        },
        "2021-07-30": {
            "1. open": "141.5200",
            "2. high": "141.8500",
            "3. low": "140.7900",
            "4. close": "140.9600",
            "5. volume": "3535555"
        },
        "2021-07-29": {
            "1. open": "142.3300",
            "2. high": "142.9600",
            "3. low": "141.6000",
            "4. close": "141.9300",
            "5. volume": "2657669"
        },
        "2021-07-28": {
            "1. open": "143.0100",
            "2. high": "143.1000",
            "3. low": "141.6400",
            "4. close": "141.7700",
            "5. volume": "2544099"
        },
        "2021-07-27": {
            "1. open": "142.5300",
            "2. high": "143.6400",
            "3. low": "141.6000",
            "4. close": "142.7500",
            "5. volume": "3137027"
        },
        "2021-07-26": {
            "1. open": "141.3900",
            "2. high": "143.0000",
            "3. low": "141.1300",
            "4. close": "142.7700",
            "5. volume": "4246266"
        },
        "2021-07-23": {
            "1. open": "140.9600",
            "2. high": "141.7000",
            "3. low": "140.3300",
            "4. close": "141.3400",
            "5. volume": "4474157"
        },
        "2021-07-22": {
            "1. open": "141.6600",
            "2. high": "141.8100",
            "3. low": "140.4100",
            "4. close": "140.7100",
            "5. volume": "3314153"
        },
        "2021-07-21": {
            "1. open": "139.9700",
            "2. high": "141.3900",
            "3. low": "139.6500",
            "4. close": "141.3000",
            "5. volume": "4803977"
        }
    }
	}



	const [prices, setPrices] = useState([])
	const canvasRef = useRef()

	// If my fetch request returned a lot more data, I would use 
	// Object.entries (maybe with .slice?) to iterate over just 
	// the graph's date-range instead of the whole object
	const getClosingPricesArr = useCallback((obj) => {
		let result = []
		for (const property in obj) {
			result.push([property, Number(obj[property]["4. close"])])
		}
		return result
	}, [])


	const makeSmaArr = (arr, daysAgo = 0, window = 20, interval = 20) => {
		let result = []
		// I'm using this for-loop + push instead of splice + reverse + map because the time complexity is O(n), versus 0(n)*3 
		for (let i = window + daysAgo - 1; i >= daysAgo; i--) {
			let sum = 0
			for (let j = i; j < i + interval; j++) {
				sum += Number(arr[j][1])
			}
			result.push([...arr[i], sum/interval])
		}
		return result
	}

	


	const fetchPrices = useCallback(() => {
		fetch('https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=IBM&apikey=7TC1O17DDEZ7SVWO')
		.then(response => response.json())
		.then(data => {
			setPrices(() => getClosingPricesArr(data["Time Series (Daily)"]))
		})
		.catch(error => console.log(error))
	}, [getClosingPricesArr])

	useEffect(() => {
		// fetchPrices()
		setPrices(() => getClosingPricesArr(returnObj["Time Series (Daily)"]))
		const canvas = canvasRef.current
    const context = canvas.getContext('2d')
	}, [fetchPrices, getClosingPricesArr])
	
	if (prices.length > 0) console.log("makeSmaArr", makeSmaArr(prices))

	return (
		<Grid container justifyContent="center" spacing={2}>
			<Grid item justifyContent="center" sx={{ pt: 2, }}>
				<canvas
					ref={canvasRef}
					style={{ 
						width: '800px', 
						height: '500px', 
						borderStyle: "solid", 
						// borderColor: ""
					}}
				>

				</canvas>
			</Grid>
		</Grid>
	)


}