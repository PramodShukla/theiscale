const mongoose = require('mongoose');

const TestCategorySchema = new mongoose.Schema({
  test_categoryId: {
    type: Number,
    required: true,
    unique: true
  },
  test_categoryName: {
    type: String,
    default: null
  },
  test_category_created: {
    type: Date,
    required: true
  }
});

module.exports = mongoose.model('test_categories', TestCategorySchema);