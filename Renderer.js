
class Renderer {
    constructor() {
        this.personSource = $('#person-template').html()
        this.templatePerson = Handlebars.compile(this.personSource) 

        this.quoteSource = $('#quote-template').html()
        this.templateQuote = Handlebars.compile(this.quoteSource) 

        this.pokemonSource = $('#pokemon-template').html()
        this.templatePokemon = Handlebars.compile(this.pokemonSource) 

        this.receipeSource = $('#receipe-template').html()
        this.templateReceipe = Handlebars.compile(this.receipeSource) 

        this.friendsSource = $('#friends-template').html()
        this.templateFriends = Handlebars.compile(this.friendsSource) 
    }
    
    renderPiece (data, template, place) {
        let newHTML = template(data);
        $(`${place}`).append(newHTML);  
    }

    renderPage (data) {
        $('.user-container').empty()
        $('.quote-container').empty()
        $('.pokemon-container').empty()
        $('.meat-container').empty()
        $('.friends-container').empty()
        this.renderPiece(data.user, this.templatePerson, '.user-container')
        this.renderPiece(data.quote, this.templateQuote, '.quote-container')
        this.renderPiece(data.pokemon, this.templatePokemon, '.pokemon-container')
        this.renderPiece(data.receipes, this.templateReceipe, '.meat-container')
        this.renderPiece(data.friends, this.templateFriends, '.friends-container')
    }
    
}