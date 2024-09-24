import { useEffect, useState } from "react";

export const useFetchProduct = (id) => {
  const [product, setProduct] = useState(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
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
        setIsLoading(false);
      });
  }, [id]);

  return {
    product,
    error,
    isLoading,
  };

}
