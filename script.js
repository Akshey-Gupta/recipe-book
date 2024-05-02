const APIkey="cee27e9ad22548fca83f5557f0ce7e2e";
const recipeListElement=document.getElementById('recipe-list');

function displayRecipes(recipes){
    recipeListElement.innerHTML="";
    recipes.forEach((recipe)=>{
        const recipeItemElement=document.createElement("li");
        recipeItemElement.classList.add('recipe-item');

        //image part
        const img=document.createElement('img');
        img.src=recipe.image;
        img.alt="an img"
        recipeItemElement.appendChild(img);

        //title part
        const title=document.createElement('h2');
        title.innerHTML=recipe.title;
        recipeItemElement.appendChild(title);

        //ingredients part
        const ingredientsElements=document.createElement('p');
        ingredientsElements.innerHTML=`<strong>Ingredients:</strong>${recipe.extendedIngredients.map((ingredient)=>ingredient.original).join(", ")}`;
        recipeItemElement.appendChild(ingredientsElements);

        //link
        recipeLinkEl = document.createElement("a");
        recipeLinkEl.href = recipe.sourceUrl;
        recipeLinkEl.innerText = "View Recipe";
        recipeItemElement.appendChild(recipeLinkEl);

        recipeListElement.appendChild(recipeItemElement);
    })
}

async function getRecipes(){
    const response=await fetch(`https://api.spoonacular.com/recipes/random?number=10&apiKey=${APIkey}`);

    const data= await response.json()
    return data.recipes;
}

async function initialize(){
    const recipes=await getRecipes();
    displayRecipes(recipes);
}

initialize();