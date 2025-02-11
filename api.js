// api.js
const path = require('path')
const Products = require('./products')
const autoCatch = require('./lib/auto-catch')

 /**
 * Handle the root route
 * @param {object} req
 * @param {object} res
*/
function handleRoot (req, res) {
  res.sendFile(path.join(__dirname, '/index.html'));
}

/**
 * List all products
 * @param {object} req
 * @param {object} res
 */
async function listProducts (req, res) {

    // Extract the limit and offset query parameters
    const { offset = 0, limit = 25, tag } = req.query
    // Pass the limit and offset to the Products service
    res.json(await Products.list({
      offset: Number(offset),
      limit: Number(limit),
      tag
    }))
   
  }

module.exports = autoCatch({
  handleRoot,
  listProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct 
});

/**
 * Get a single product
 * @param {object} req
 * @param {object} res
 */
async function getProduct (req, res, next) {
    const { id } = req.params

  const product = await Products.get(id)
  if (!product) {
    return next()
  }
  
  return res.json(product)
  }
 
  /**
 * Create a new product
 * @param {object} req
 * @param {object} res
 */
async function createProduct(req, res) {
  const newProduct = await Products.create(req.body)
  res.status(201).json(newProduct)
}
  /**
 * Update an existing product
 * @param {object} req
 * @param {object} res
 */
async function updateProduct(req, res) {
    const { id } = req.params
    console.log(`Product with ID ${id} updated`) // ✅ Logging the update
    res.status(200).json({ message: `Product ${id} updated` }) // ✅ Returns success
  }

  /**
 * Delete a product
 * @param {object} req
 * @param {object} res
 */
async function deleteProduct(req, res) {
    const { id } = req.params
    console.log(`Product with ID ${id} deleted`)
    res.status(202).json({ message: `Product ${id} deleted` }) 
  }