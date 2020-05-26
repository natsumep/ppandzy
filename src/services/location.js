import axios from "axios"
const jsonp = (url) => {
    if(!url){
        console.error('请传入一个url参数')
        return;
    }
    return new Promise((resolve,reject) => {
        var random = (+new Date() +""+ Math.random()).replace(".","");
        window["jsonCallBack"+random] = (result) => {
            resolve(result)
            window["jsonCallBack"+random] = null;
        }
        var JSONP=document.createElement("script");
        JSONP.type="text/javascript";
        JSONP.src=`${url}&callback=${["jsonCallBack"+random]}`;
        document.getElementsByTagName("head")[0].appendChild(JSONP);
        setTimeout(() => {
            document.getElementsByTagName("head")[0].removeChild(JSONP)
        },500)
    })
} 
class LocationService {
    constructor() {
        this.coordinate = "";
        this.locationName = "";
    }
    loadCoor() {
        return new Promise((a, b) => {
            if (navigator.geolocation) {
                var geo_options = {
                    enableHighAccuracy: true,
                    maximumAge: 3000,
                    timeout: 2700
                };
                navigator.geolocation.getCurrentPosition(
                    function (coords) {
                        const coordinate = [coords.coords.latitude, coords.coords.longitude];
                        a({
                            coordinate,
                            coords
                        });
                    },
                    function (e) {
                        b(e)
                        throw (e.message);
                    }
                ),
                    geo_options
            }
        })

    }
    loadLocName() {
        return new Promise((a, b) => {
            jsonp("https://apis.map.qq.com/ws/location/v1/ip?key=3IABZ-KBDKP-UB7D3-VSZ3O-UXE3F-QUFN5&output=jsonp").then((data) => {
            a(data)
            })  
        })

    }
    loadGeoLocInfo(geo) {
        return new Promise((a, b) => {
            jsonp(`https://apis.map.qq.com/ws/geocoder/v1?key=3IABZ-KBDKP-UB7D3-VSZ3O-UXE3F-QUFN5&output=jsonp&location=${geo.join(",")}`).then(data=>{
                a(data)
            },(e)=>{
                b(e);
            })
        })
    }
    getLocInfo() {
        return new Promise((a, b) => {
            this.loadCoor().then((data) => {
                const coordinate = data.coordinate;
                const coordInfo = data.coords;
                this.loadGeoLocInfo(coordinate).then((data) => {
                    a({
                        coordinate,
                        coordInfo,
                        address: data.result.address,
                        source: "geolocation"
                    })
                })
            }, () => {
                this.getTxLocInfo().then((data) => {
                    a(data)
                })
            })
        })

    }
    getTxLocInfo() {
        return new Promise((a) => {
            this.loadLocName().then(data => {
                const coordinate = [data.result.location.lng, data.result.location.lat];
                const adInfo = data.result.ad_info;
                const address = [adInfo.nation, adInfo.province, adInfo.city, adInfo.district].join("")
                a({
                    coordinate,
                    address,
                    source: "tencentMap",
                    coordInfo:"unkown"
                })
            })
        })
    }
}


export const locationService = new LocationService();