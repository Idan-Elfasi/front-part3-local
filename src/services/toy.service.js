import { httpService } from './http.service'
import { utilService } from './util.service'

const BASE_URL = 'toy/'
const STORAGE_KEY = 'toyDB'

const labels = [
  'On wheels',
  'Box game',
  'Art',
  'Baby',
  'Doll',
  'Puzzle',
  'Outdoor',
  'Battery Powered',
]

const branches={
  Hadera:{lat:32.44192 ,lng: 34.9039},
  Holon:{lat:32.0166666 ,lng:34.7666636},
  KiryatShmona:{lat: 33.208,lng: 35.57},

}


export const toyService = {
  query,
  getById,
  save,
  remove,
  getEmptyToy,
  getDefaultFilter,
  getDefaultSort,
  getToyLabels,
  getBranchs,
}

async function query(filterBy = {}, sortBy, pageIdx) {
  console.log('toys where are you?');
  return await httpService.get(BASE_URL, { filterBy, sortBy, pageIdx })
}

 async function getById(toyId) {
  return await httpService.get(BASE_URL + toyId)
}

 async function remove(toyId) {
  return  await httpService.delete(BASE_URL + toyId)
}

 async function save(toy) {
   return  toy._id ?  await httpService.put(BASE_URL + toy._id, toy) :  await httpService.post(BASE_URL , toy)
}

function getDefaultFilter() {
  return {
    txt: '',
    inStock: null,
    labels: [],
    pageIdx: 0,
  }
}

function getDefaultSort() {
  return { type: '', desc: 1 }
}

function getEmptyToy() {
  return {
    name: '',
    price: '',
    labels: _getRandomLabels(),
  }
}

function getToyLabels() {
  return [...labels]
}

function getBranchs(){
return {...branches}
}

function _getRandomLabels() {
  const labelsCopy = [...labels]
  const randomLabels = []
  for (let i = 0; i < 2; i++) {
    const randomIdx = Math.floor(Math.random() * labelsCopy.length)
    randomLabels.push(labelsCopy.splice(randomIdx, 1)[0])
  }
  return randomLabels
}

// function inStockandLabelCounts(label){
//   return   toyService.query(toyService.getDefaultFilter())
//     .then(toys=>  toys.filter( toy=>toy.inStock&& toy.labels.includes(label )
//     .then(filterdToys=>  {
//         if (filterdToys !== undefined) {
//           console.log('FilterdToys-len:', filterdToys.length);
//            return filterdToys.length
//           } else {
//             console.log('No result returned.');
//           }
//     } )
    
// )) 
// toy

// }
