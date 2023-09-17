/**
 * fetches result of search from API
 */

export async function getSearch(searchText) {
  let response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchText}`);
  let rawData = await response.json();
  return rawData.drinks;
}