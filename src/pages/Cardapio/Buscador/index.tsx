import styles from './Buscador.module.scss'
import {CgSearch } from 'react-icons/cg'
interface BuscadorProps {
busca: string;
setBusca:React.Dispatch<React.SetStateAction<string>>
}

export default function Buscador({busca, setBusca}: BuscadorProps) {
  return <div className={styles.buscador}>
    <input
        value={busca}
        onChange={(e) => setBusca(e.target.value)}
    />
    <CgSearch color='#4c4d5e' size={20} />
  </div>

}
