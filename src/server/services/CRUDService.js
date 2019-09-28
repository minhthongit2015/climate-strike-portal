
const ApiHelper = require('../utils/ApiHelper');
const ConverterFactory = require('../models/converters/converter-factory');

module.exports = class CRUDBase {
  static set model(model) {
    this._model = model;
  }

  static get model() {
    return this._model;
  }

  static async create(doc) {
    const newDoc = await this.model.create(doc).exec();
    return newDoc;
  }

  static async get(id) {
    const doc = await this.model.findById(id).exec();
    return ConverterFactory.get(this.model.name).convert(doc);
  }

  static async list(opts = ApiHelper.listParams) {
    const docs = await ApiHelper.findWithModel(this.model, opts);
    return ConverterFactory.get(this.model.name).convertCollection(docs);
  }

  static async update(id, props) {
    const updatedDoc = await this.model.findByIdAndUpdate(id, props).exec();
    return ConverterFactory.get(this.model.name).convert(updatedDoc);
  }

  static async delete(id) {
    const deleteResult = await this.model.findOneAndDelete(id).exec();
    return deleteResult;
  }
};
