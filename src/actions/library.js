export const types = {
  ADD_MANGA: 'ADD_MANGA',
};

export const addManga = (manga) => ({
  type: types.ADD_MANGA,
  payload: manga,
});
