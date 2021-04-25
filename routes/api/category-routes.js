const router = require('express').Router();
const { Category, Product } = require('../../models');



router.get('/', async (req, res) => {
  // find all categories
  await Category.findAll({
    include: [{ model: Product }],
  }).then((categoryData) => {
    res.json(categoryData);
  });
  
});

router.get('/:id',  async (req, res) => {
  // find one category by its `id` value
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
    res.status(200).json(insertedData);
  } catch (err) {
    res.status(400).json(err);
  }
});





router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Category.update(
    {
      category_name: req.body.category_name,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  )
    .then((updatedCategory) => {
      res.json(updatedCategory);
    })
    .catch((err) => res.json(err));
});





router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  Category.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((deletedCat) => {
      res.json(deletedCat);
    })
    .catch((err) => res.json(err));
});

module.exports = router;
