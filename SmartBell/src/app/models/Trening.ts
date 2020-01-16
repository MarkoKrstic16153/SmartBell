import DeoTreninga from './DeoTreninga';
interface Trening{
    vrstaTreninga:string;
    id?:number;
    user:string;
    delovi:DeoTreninga[];
    kalorije:number;
    datum:string;
}
export default Trening;