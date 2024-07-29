import React, { useEffect, useRef, useState } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { toyService } from '../services/toy.service.js';

ChartJS.register(ArcElement, Tooltip, Legend);


export function MyChart({ toys }) {
  const [dataCount, setDataCount] = useState([])
  const labels = useRef(toyService.getToyLabels())
  const charDats=useRef([])

  useEffect(() => {
    charDats.current=[]
    labels.current.forEach(label=>labelStockCount(label)
  )
    console.log('render again');
  setDataCount(charDats.current)
  console.log('data array to data: '+ charDats.current);
  },[])

  function labelStockCount(toyLabel) {
    // console.log( 'all toys :'+ toys.length);
    console.log('current labal: ' + toyLabel);
    const len = toys.filter(toy => toy.inStock && toy.labels.find( label => label===toyLabel)).length
    console.log( ' amount of toys in stock and have same label : ' +len);
  if(!len) return
  return charDats.current.push(len)
  
  }
  const data = {
    labels: toyService.getToyLabels(),
    datasets: [
      {
        label: '# of Votes',
        // data: [12, 19, 3, 5, 2, 3],
        data: dataCount.length>0?dataCount: [2, 1, 3,1, 2, 3],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };
  return <Pie data={data} />;
}
