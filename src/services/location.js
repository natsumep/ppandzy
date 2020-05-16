import  axios from "axios"
 
class LocationService {
    constructor(){
        this.coordinate = "";
        this.locationName = "";
    }
    loadCoor(){
        return new Promise((a,b)=>{
            if(navigator.geolocation) {
                var geo_options = {
                    enableHighAccuracy: true, 
                    maximumAge        : 3000, 
                    timeout           : 2700
                  };
                navigator.geolocation.getCurrentPosition(
                    function (coords) {  
                        const coordinate = [coords.coords.longitude,coords.coords.latitude];
                        a({
                            coordinate,
                            coords
                        });
                    },
                    function (e) {
                        b(e)
                       throw(e.message);
                    }
                ) ,
                geo_options
            }
        })
        
    }
    loadLocName(){
        return axios.get("https://apis.map.qq.com/ws/location/v1/ip",{
            params:{key:"3IABZ-KBDKP-UB7D3-VSZ3O-UXE3F-QUFN5"}
        })
    }
    loadGeoLocInfo(geo){
        const params = {
            key :"3IABZ-KBDKP-UB7D3-VSZ3O-UXE3F-QUFN5",
            location: geo.join(","),
        }
        return axios.get("https://apis.map.qq.com/ws/geocoder/v1",{
            params
        })
    }
    getLocInfo(){
        return new Promise((a,b)=>{
            this.loadCoor().then((data)=>{
                const coordinate = data.coordinate;
                this.loadGeoLocInfo(coordinate).then((data)=>{
                    a({
                        coordinate,
                        coordInfo:data.coords,
                        address:data.result.address,
                        source: "geolocation"
                    })
                })
            },()=>{
                this.getTxLocInfo().then((data)=>{
                    a(data)
                })
            })
        })
        
    }
    getTxLocInfo(){
        return new Promise((a)=>{
            this.loadLocName().then(data=>{
                const coordinate = [data.result.lng,data.result.lat];
                const adInfo = data.result.ad_info;
                const address = [adInfo.nation,adInfo.province,adInfo.city,adInfo.district].join("")
                a({
                    coordinate,
                    address,
                    source: "tencentMap"
                })
            })
        })
    }
}


export const locationService =  new LocationService();