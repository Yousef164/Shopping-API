const router = require("express").Router();

const multer = require("multer");

const fileFilter = ((req, file, cb) => {
  
  if(file.mimetype === 'image/jpeg') {
    cb(null, true);
  } else {
    cb(new Error("please upload jpeg file"), false)
  }
});

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "productImages");
  },

  filename: function(req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  },

});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5
  },
  fileFilter: fileFilter
});

router.get("/", (req, res, next) => {
  Product.find({})
    .select("_id productName productPrice")
    .then((products) => {
      const result = products.map((product) => {
        return {
          productName: product.productName,
          productPrice: product.productPrice,
          URL: {
            type: "GET",
            urls: `http://localhost:3000/products/${product._id}`,
          },
        };
      });
      res.status(200).json({
        message: "Products fetched successfully",
        products: result,
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err.message,
      });
    });
});

router.post("/addProduct", upload.single('myfile'), (req, res, next) => {
  
  console.log(req.file);
  
  const product = new Product({
    productName: req.body.productName,
    productPrice: req.body.productPrice,
    productImage: req.file.path
  });
  product
    .save()
    .then((result) => {
      res.status(201).json({
        message: "Product added successfully",
        product: result,
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err.message,
      });
    });
});

router.get("/:productId", (req, res, next) => {
  Product.findOne({ _id: req.params.productId })
    .select("productName productPrice")
    .then((result) => {
      if (result) {
        res.status(200).json({
          message: "Product fetched successfully",
          product: result,
        });
      } else {
        res.status(404).json({
          message: "Product not found",
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        error: err.message,
      });
    });
});

router.put("/:productId", (req, res, next) => {
  const updateProduct = {
    productName: req.body.productName,
    productPrice: req.body.productPrice,
  };

  Product.updateOne({ _id: req.params.productId }, updateProduct)
    .then((result) => {
      if (result) {
        res.status(201).json({
          message: "Product updated successfully",
          product: updateProduct,
        });
      } else {
        res.status(404).json({
          message: "Product not found",
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        error: err.message,
      });
    });
});

router.delete("/:productId", (req, res, next) => {
  Product.deleteOne({ _id: req.params.productId })
    .then((result) => {
      if (result.deletedCount > 0) {
        res.status(200).json({
          message: "Product deleted successfully",
        });
      } else {
        res.status(404).json({
          message: "Product not found",
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        error: err.message,
      });
    });
});

module.exports = router;
