//This is the class that will manage all your APIs

class APIManager {
    constructor() {
        this.data;
    }

    filterData(responces, pokemonObj) {
        // if (responces[4].data === []){
        //     this.getData()
        // }
        console.log(responces)
        let names = []
        for (let friend of responces[3].results) {
            names.push({name: friend.name.first + ' ' + friend.name.last})
        }
        let rows = []
        for (let myRow of responces[2]) {
            rows.push({row: myRow})
        }
        this.data = {
            user: {
                user: {name: responces[0].results[0].name.first, 
                address: responces[0].results[0].location.city, 
                img: responces[0].results[0].picture.medium}
            },
            quote: {
                quote: responces[1].quote
            },
            pokemon: {pokemon: {
                gif:responces[4].data[0].embed_url,
                name:pokemonObj.name, 
                image: pokemonObj.sprites.front_default,
                // type: pokemonObj.type.name
            }
            },
            receipes: {
                receipes: rows
            },
            friends: {
                objects: names
            },
        }
    }

    async getData() {
        let pokemonObj = await this.getPokemon()
        let name = pokemonObj.name
        console.log('getData:', name)
        
        await Promise.all([
            this.getUser(), 
            this.getQuote(), 
            this.getReceipe(), 
            this.getFriends(),
            this.getGifPokemonUrl(name)
        ]).then(responces => {
            this.filterData(responces, pokemonObj)})
        .catch(function(err) {
             // some coding error in handling happened
        })  // just return an array
        return this.data
    }

    getUser () {
        let promise = $.ajax( 'https://randomuser.me/api/?inc=name,location,picture' ) 
        return promise
    }
    getFriends() {
        let promise = $.ajax( 'https://randomuser.me/api/?results=6' )
        return promise
    }

    getQuote () {
        let promise = $.ajax( 'https://api.kanye.rest' )
        return promise
    }

    _getRandomInt() {
        return Math.floor(Math.random() * 1000);
    }
    async getPokemon() {
        let pokemon = await $.get(`https://pokeapi.co/api/v2/pokemon/${this._getRandomInt()}/`)
        console.log(pokemon.name)
        return pokemon
    }

    getGifPokemonUrl(name){
        const API_KEY = 'KBJ9heNSXriM7bZ3nAw9prsgujGCvS7F'
        console.log('getGifPokemonUrl', name)
        let promise = $.ajax(`//api.giphy.com/v1/gifs/search?q=${name}&api_key=${API_KEY}&limit=1`)
        return promise
    }

    getReceipe() {
        let promise = $.ajax('https://baconipsum.com/api/?type=meat-and-filler')
        return promise
    }
}

