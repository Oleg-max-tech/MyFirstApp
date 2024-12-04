import { useEffect, useState } from "react";
import { tmbdApi } from "../../../services/tmbdAPI";

type Props = {
  type: string;
  genre: string;
};

const useMovies = ({ genre, type }: Props) => {
  const [items, setItems] = useState<any[]>([]); // Тут ми вказуємо точний тип
  const [loading, setLoading] = useState(true);

  const fetchItems = async () => {
    setLoading(true);

    try {
      let data;
      data = await tmbdApi.getMoviesByTypeAndGenre(type, genre);

      if (data.results && data.results.length > 0) {
        setItems(data.results); // Тип уже вказано для результатів
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, [type, genre]);

  return {
    items,
    loading,
    fetchItems,
  };
};

export { useMovies };
