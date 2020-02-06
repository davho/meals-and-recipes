//This isn't, of course, specific to React or React Native, this is just ES6 vanilla javascript, i.e. ES6 classes as syntactic sugar on function constructors. This is just to define how we want our data shaped. We define how a Category object in our application should look like so we have an easier way of creating these objects without mistyping, etc.

class Category {
    constructor(iddd, title, color) { //constructor a default method of classes used to initialize an object based on this class. Do this by expecting some arguments in the constructor, in this case id title and color. We then store these as properties prefixed by this.
        this.iddd = iddd //Calling this iddd just to demo how key extractor works
        this.title = title
        this.color = color
    }
}

export default Category

//Now Category can be imported into the dummy data file and then used to create some dummy data.
