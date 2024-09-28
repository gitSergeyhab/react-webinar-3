export const getArticlesUri = (limit, skip) =>
  `/api/v1/articles?limit=${limit}&skip=${skip}&fields=items(_id, title, price),count`;

export const getArticleUri = (id) =>
  `/api/v1/articles/${id}?fields=_id,title,edition,price,description,madeIn(title),category(title)`
