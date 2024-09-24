import { useEffect, useState } from "react";

export const useFetchProduct = (id) => {
  const [product, setProduct] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/v1/articles/${id}?fields=*,madeIn(title),category(title)`)
      .then((response) => response.json())
      .then((data) => {
        setProduct(data.result);
        setError('');
      })
      .catch((error) => {
        console.error(error);
        setError('Ошибка загрузки данных товара');
      }).finally(() => {
        setLoading(false);
      });
  }, [id]);

  return {
    product,
    error,
    loading,
  };

}
