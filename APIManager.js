//This is the class that will manage all your APIs

class APIManager {
    constructor() {
        this.data;
    }

    filterData(responces) {
        let names = []
        for (let friend of responces[4].results) {
            names.push({name: friend.name.first + ' ' + friend.name.last})
        }
        let rows = []
        for (let myrow of responces[3]) {
            rows.push({row: myrow})
        }
        
        this.data = {
            user: {user: {name: responces[0].results[0].name.first, 
                address: responces[0].results[0].location.city, 
                img: responces[0].results[0].picture.medium}
            },
            quote: {quote: responces[1].quote},
            pokemon: {pokemon: {name:responces[2].name, 
                                image: responces[2].sprites.front_default}
            },
            receipes: {receipes: rows},
            friends: {objects: names}
        }
    }

    async getData() {
        let responces = await Promise.all([this.getUser(), this.getQuote(), this.getPokemon(), this.getReceipe(), this.getFriends()]).then(responces => responces)
        await this.filterData(responces)
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
        return Math.floor(Math.random() * 500);
    }
    getPokemon() {
        let promise = $.ajax(`https://pokeapi.co/api/v2/pokemon/${this._getRandomInt()}/`)
        return promise
    }

    getReceipe() {
        let promise =  $.ajax('https://baconipsum.com/api/?type=meat-and-filler')
        return promise
    }
}

