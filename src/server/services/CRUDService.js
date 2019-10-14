
const ApiHelper = require('../utils/ApiHelper');
const ConverterFactory = require('../models/converters/ConverterFactory');
const { isNotSet } = require('../utils');


module.exports = class CRUDService {
  static set model(model) {
    this._model = model;
  }

  static get model() {
    return this._model;
  }

  static get converter() {
    return ConverterFactory.get(this.model.modelName);
  }

  static get populate() {
    return [];
  }

  static clone(model) {
    return {
      model,
      converter: ConverterFactory.get(model.modelName),
      populate: this.populate
    };
  }

  static resolveListOptions(opts = ApiHelper.listParams) {
    return opts;
  }

  static async create(doc) {
    const newDoc = await this.model.create(doc);
    return this.converter.convert(newDoc);
  }

  static async getOrList(id, opts = ApiHelper.listParams) {
    if (isNotSet(id)) {
      return this.list(opts);
    }
    return this.get(id);
  }

  static async get(id) {
    id = ApiHelper.getId(id);
    let query = this.model.findById(id);
    query = this.populate.reduce(
      (prevQuery, relatedColection) => prevQuery.populate(relatedColection),
      query
    );
    const doc = await query.exec();
    return this.converter.convert(doc);
  }

  static async first(opts = ApiHelper.listParams) {
    opts.limit = 1;
    const foundDocs = await this.list(opts);
    return this.converter.convert(foundDocs[0]);
  }

  static async list(opts = ApiHelper.listParams) {
    const listOptions = await this.resolveListOptions(opts);
    if (!listOptions) { // null mean that is have some errors
      return [];
    }
    let query = ApiHelper.findWithModel(this.model, listOptions);
    query = this.populate.reduce(
      (prevQuery, relatedColection) => prevQuery.populate(relatedColection),
      query
    );
    const docs = await query.exec();
    return this.converter.convertCollection(docs);
  }

  static async update(id, doc) {
    if (!doc) {
      doc = id;
      id = doc._id || doc.id;
    }
    id = ApiHelper.getId(id);
    const { id: idz, _id, ...restProps } = doc;
    const updatedDoc = await this.model.findByIdAndUpdate(id, restProps).exec();
    return this.converter.convert(updatedDoc);
  }

  static async createOrUpdate(doc) {
    if (doc._id || doc.id) {
      return this.update(doc);
    }
    return this.create(doc);
  }

  static async delete(id) {
    id = ApiHelper.getId(id);
    const deleteResult = await this.model.findByIdAndDelete(id).exec();
    return deleteResult;
  }
};
