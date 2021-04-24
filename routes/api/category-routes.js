const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  await Category.findAll({
    include: [{ model: Product }],
  }).then((categoryData) => {
    res.json(categoryData);
  });
  
});

router.get('/:id',  async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const catIdData = await Category.findByPk(req.params.id, {
      include: [{ model: Product}],
    });

    if (!catIdData) {
      res.status(404).json({ message: 'No category found with that id!' });
      return;
    }

    res.status(200).json(catIdData);
  } catch (err) {
    res.status(500).json(err);
  }
  
});




  // create a new category
  router.post('/', async (req, res) => {
  try {
    const insertedData = await Category.create({
      category_name: req.body.category_name,
    });
    // 200 status code means the request is successful
    res.status(200).json(insertedData);
  } catch (err) {
    // 400 status code means the server could not understand the request
    res.status(400).json(err);
  }
});


router.put('/:id', (req, res) => {
  // update a category by its `id` value
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
});

module.exports = router;
