import { getSearch } from "./fetchSearch.js";

const MAINDIV = document.getElementById('searchDiv');

addEventListener('load', main);

function main() {
  removeEventListener('load', main);
  document.getElementById('searchButton').addEventListener('click', search);
}

async function search() {
  let searchText = document.getElementById('searchText').value;
  let searchResult = await getSearch(searchText);
  displayResults(searchResult, searchText);
}

function displayResults(results, searchText) {
  let div = removePrev();

  if (!results) {
    let errorText = document.createElement('p');
    errorText.innerHTML = `Vi kunde tyvärr inte hitta något resultat för '${searchText}', testa en annan sökterm.`;
    div.appendChild(errorText);
  }
  else {
    for (let i = 0; i < results.length; i++) {
      const result = results[i];
  
      let header = document.createElement('h3');
      header.innerHTML = result.strDrink;
      div.appendChild(header);
  
      displayIngredients(result, div);
  
      let instructions = document.createElement('p');
      instructions.innerHTML = result.strInstructions;
      div.appendChild(instructions);
    }
  }
}

function displayIngredients(result, div) {
  for (let x = 1; x <= 15; x++) {
    let ingredient = result["strIngredient" + x];
    let measurement = result["strMeasure" + x];
    let ingredientElement = document.createElement('p');

    if (measurement) {
      ingredientElement.innerHTML = measurement + " " + ingredient;
    }

    else if (ingredient) {
      ingredientElement.innerHTML = ingredient;
    }

    div.appendChild(ingredientElement);
  }
}

function removePrev() {
  let oldDiv = document.getElementById('searchResult');
  oldDiv.parentNode.removeChild(oldDiv);
  let newDiv = document.createElement('div');
  newDiv.setAttribute('id', 'searchResult');
  MAINDIV.appendChild(newDiv);
  return newDiv;
}