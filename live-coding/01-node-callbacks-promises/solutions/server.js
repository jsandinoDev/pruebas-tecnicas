import express from "express";

export const app = new express();
app.use(express.json())

const items = [{
    id: 1,
    content: 'Item 1'
}]

//get items
app.get('/items', (req, res) => {
    return res.json(items)
})

//get item
app.get('/items/:id', (req, res) => {
    const { id } = req.params
    const item = items.find(item => item.id === Number(id))
    return res.json(items)
})
//post /items
app.post('/items', function (req, res) {
    const { content } = req.body
    const newId = items.length + 1
    const newItem = { id: newId, content: content }
    items.push(newItem)
    res.json(item)
})

//put item
app.put('/items/:id', function (req, res) {
    const { id } = req.params
    const { content } = req.body
    const item = items.find(item => item.id === Number(id))
    item.content = content
    return res.json(items)
})

//delete
app.delete('/items/:id', function (req, res) {
    const { id } = req.params
    const itemIndex = items.findIndex(item => item.id === Number(id))
    items.splice(itemIndex, 1)
    return res.status(200).json();
})


export const server = app.listen(3000)