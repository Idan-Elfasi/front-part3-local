import React, { useState } from "react";
import GoogleMapReact from 'google-map-react';

import { toyService } from "../services/toy.service.js";


// const branches=toyService.getBranchs()
// console.log(Object.keys(branches));

//   const markers =Object.keys(branches).map(place=>{
//     console.log(place);
//     const cmps  = ({ text }) => <div style={{ fontSize: '1.2em' }}>{text}</div>;
// })
// console.log(markers);

const AnyReactComponent = ({ text }) => <div style={{ fontSize: '1.2em' }}>{text}</div>;


export function GoogleMap() {
     const branchesMap=toyService.getBranchs()
const places=Object.keys(branchesMap)
const branchsCoords=Object.values(branchesMap)
// console.log(branches);
//     const  [branch,setBranch]=useState(branches[0])

    const [coords, setCoords] = useState({ lat: 32.0853, lng: 34.7818 })
    const zoom = 11
    const API_KEY='AIzaSyCSCSk4gGRLeUhepzulys-d3UdMyNBuUUI'

    function onHandaleClick({ lat, lng }) {
        setCoords({ lat, lng })
    }

    return (
        // Important! Always set the container height explicitly
        <div style={{ height: '100vh', width: '100%' }}>
            <GoogleMapReact
                bootstrapURLKeys={{ key:API_KEY }}
                defaultCenter={coords}
                defaultZoom={zoom}
                onClick={onHandaleClick}
            >

                {
                   branchsCoords.map(coorsBranch=>{
                       <AnyReactComponent
                         {...coorsBranch}
                           text="🚩"
                       />

                   })

                //    <AnyReactComponent
                //    {...coorsBranch}
                //      text="🚩"
                //  />

                }
            </GoogleMapReact   >
        </div>
    );
}