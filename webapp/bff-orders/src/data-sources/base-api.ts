import { RESTDataSource } from 'apollo-datasource-rest';
import { URLSearchParamsInit } from 'apollo-server-env';
import { Logger } from '../utilities';

class BaseApi extends RESTDataSource {
  private logger: Logger = new Logger();
  constructor() {
    super();
  }

  async getData(path: string, params?: URLSearchParamsInit) {
    try {
      const response = await this.get(path, params);
      return response;
    } catch (err) {
      // TODO: should be refactor to return error code
      this.logger.log(err);
    }
  }

  async postData(path: string, params?: URLSearchParamsInit) {
    try {
      const response = await this.post(path, params);
      return response;
    } catch (err) {
      this.logger.log(err);
    }
  }

  async putData(path: string, params?: URLSearchParamsInit) {
    try {
      const response = await this.put(path, params);
      return response;
    } catch (err) {
      this.logger.log(err);
    }
  }

  async deleteData(path: string, params?: URLSearchParamsInit) {
    try {
      const response = await this.delete(path, params);
      return response;
    } catch (err) {
      this.logger.log(err);
    }
  }
}

export default BaseApi;
