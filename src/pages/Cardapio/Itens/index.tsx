import styles from "./Itens.module.scss";
import { useEffect, useState } from "react";
import cardapio from "data/cardapio.json";
import Item from "./Item";

interface IitensProps {
  busca: string;
  filtro: number | null;
  ordenador: string;
}

export default function Itens(props: IitensProps) {
  const [lista, setLista] = useState(cardapio);
  const { busca, filtro, ordenador } = props;

  const testaBusca = (title: string) => {
    const regex = new RegExp(busca, "i"); //i = case insensitive
    return regex.test(title);
  };
  const testaFiltro = (id: number) => {
    if (filtro !== null) return filtro === id;
    return true;
  };

  const ordenarProps = (
    lista: typeof cardapio,
    propriedade: keyof Pick<(typeof cardapio)[0], "size" | "serving" | "price">
  ) => {
    return lista.sort((a, b) => (a[propriedade] > b[propriedade] ? 1 : -1));
  };

  const ordenar = (lista: typeof cardapio) => {
    switch (ordenador) {
      case "porcao":
        return ordenarProps(lista, "size");
      case "qtd_pessoas":
        return ordenarProps(lista, "serving");
      case "preco":
        return ordenarProps(lista, "price");
      default:
        return lista;
    }
  };

  useEffect(() => {
    const listaFiltrada = cardapio.filter((item) => {
      return testaBusca(item.title) && testaFiltro(item.category.id);
    });
    setLista(ordenar(listaFiltrada));
  }, [busca, filtro, ordenador]);

  return (
    <div className={styles.itens}>
      {lista.map((item) => (
        <Item key={item.id} {...item} />
      ))}
    </div>
  );
}
