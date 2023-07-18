const manager = new APIManager()
const renderer = new Renderer()


async function render() {
    await manager.getData()
    renderer.renderPage(manager.data)
}

render()

$('.container').on('click', 'button',function() {
    render()    
})