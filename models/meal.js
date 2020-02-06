class Meal {
    constructor(id, categoryIds, title, affordability, complexities, imageUrl, duration, ingredients, steps, isGlutenFree, isVegan, isVegetarian, isLactoseFree) {
        this.id = id
        this.categoryIds = categoryIds
        this.title = title
        this.affordability = affordability
        this.complexities = complexities
        this.imageUrl = imageUrl
        this.duration = duration
        this.ingredients = ingredients
        this.steps = steps
        this.isGlutenFree = isGlutenFree
        this.isVegan = isVegan
        this.isVegetarian = isVegetarian
        this.isLactoseFree = isLactoseFree
    }
}

export default Meal
