import simpleRestProvider from "ra-data-simple-rest";
import { DataProvider } from "react-admin";
import addUploadFeature from "./addUploadFeature";

import api from "../Axios";
import { getData } from "../../utils/storage";
import jwtDecode from "jwt-decode";

const dataProvider = simpleRestProvider(`${import.meta.env.VITE_PROVIDER}`);

const addTagsSearchSupport = (dataProvider: DataProvider) => ({
  ...dataProvider,
  getList: (resource: string, params: any) => {
    const config = {
      method: "get",
      url: resource,
      params: params,

    };

    return api(config).then(
      (res) => {
        return Promise.resolve({
          data: res.data.data,
          total: res.data.total,
        });
      },
      (err) => {
        return Promise.reject(new Error(err.message));
      }
    );
  },

  getMany: (resource: string, params: any) => {
    const config = {
      method: "get",
      url: resource,
      params: params,

    };

    return api(config).then(
      (res) => {
        return Promise.resolve({
          data: res.data.data,
        });
      },
      (err) => {
        return Promise.reject(new Error(err.message));
      }
    );
  },

  getManyReference: (resource: string, params: any) => {
    const config = {
      method: "get",
      url: resource,
      params: params,

    };

    return api(config).then(
      (res) => {
        return Promise.resolve({
          data: res.data.data,
          total: res.data.total,
        });
      },
      (err) => {
        return Promise.reject(new Error(err.message));
      }
    );
  },

  getOne: (resource: string, params: any) => {
    const config = {
      method: "get",
      url: resource + "/" + params.id,

    };

    return api(config).then(
      (res) => {
        return Promise.resolve({
          data: res.data.data,
        });
      },
      (err) => {
        return Promise.reject(new Error(err.message));
      }
    );
  },

  create: (resource: string, params: any) => {

    const token = getData("AccessToken")

    let decoded = {
      "sub": "",
      "role": [],
      "iat": 0,
      "exp": 0,
      "type": ""
    };

    if (token) {
      decoded = jwtDecode(token);
      Object.assign(params.data, { UserId: parseInt(decoded.sub.toString()) })
    }

    if (!params.data.Image && !params.data.Budget) {

      const config = {
        method: "post",
        url: resource,
        data: params.data,
      };

      return api(config).then(
        (res) => {
          return Promise.resolve({
            data: res.data,
          });
        },
        (err) => {
          return Promise.reject(new Error(err.response.data.message));
        }
      );
    }

    let form_data = new FormData();

    console.log(params.data)

    for (let key in params.data) {
      if (key === "Image") {
        form_data.append("Image", params.data.Image.rawFile);
      } else if (key === "File") {
        form_data.append("File", params.data.File.rawFile);
      } else if (key === "Tor") {
        form_data.append("Tor", params.data.Tor.rawFile);
      } else if (key === "Icp") {
        form_data.append("Icp", params.data.Icp.rawFile);
      } else if (key === "Budget") {
        form_data.append("Budget", params.data.Budget.rawFile);
      } else if (key === "BusinessProfile") {
        form_data.append("BusinessProfile", params.data.BusinessProfile.rawFile);
      }
      else {
        form_data.append(key, params.data[key]);
      }
    }

    const config = {
      method: "post",
      url: resource,
      data: form_data,
    };

    return api(config).then(
      (res) => {
        return Promise.resolve({ data: res.data });
      },
      (err) => {
        return Promise.reject(new Error(err.response.data.message));
      }
    );
  },

  update: (resource: string, params: any) => {
    const token = getData("AccessToken")

    let decoded = {
      "sub": "",
      "role": [],
      "iat": 0,
      "exp": 0,
      "type": ""
    };

    if (token) {
      decoded = jwtDecode(token);
      Object.assign(params.data, { UserId: parseInt(decoded.sub.toString()) })
    }

    if (!params.data.Imageupdate) {
      const config = {
        method: "put",
        url: resource + "/" + params.id,
        data: params.data,
      };

      return api(config).then(
        (res) => {
          return Promise.resolve({ data: res.data });
        },
        (err) => {
          console.log(err)
          return Promise.reject(new Error(err.message));
        }
      );
    }

    let form_data = new FormData();

    for (let key in params.data) {
      if (key === "Imageupdate") {
        form_data.append("Imageupdate", params.data.Imageupdate.rawFile);
      }
      else if (key === "Fileupdate") {
        form_data.append("Fileupdate", params.data.Fileupdate.rawFile);
      }
      else if (key === "Torupdate") {
        form_data.append("Torupdate", params.data.Torupdate.rawFile);
      }
      else if (key === "Icpupdate") {
        form_data.append("Icpupdate", params.data.Icpupdate.rawFile);
      }
      else if (key === "Budgetupdate") {
        form_data.append("Budgetupdate", params.data.Budgetupdate.rawFile);
      }
      else if (key === "BusinessProfileupdate") {
        form_data.append("BusinessProfileupdate", params.data.BusinessProfileupdate.rawFile);
      }
      else {
        form_data.append(key, params.data[key]);
      }
    }

    const config = {
      method: "put",
      url: resource + "/" + params.id,
      data: form_data,
    };

    return api(config).then(
      (res) => {
        return Promise.resolve({ data: res.data });
      },
      (err) => {
        return Promise.reject(new Error(err.response.data.message));
      }
    );
  },

  delete: (resource: string, params: any) => {

    const config = {
      method: "delete",
      url: resource + "/" + params.id,
    };

    return api(config).then(
      (res) => {
        return Promise.resolve({ data: params.id });
      },
      (err) => {
        return Promise.reject(new Error(err.message));
      }
    );
  },

  deleteMany: (resource: string, params: any) => {

    console.log(params)

    params.ids.forEach((id: any) => {
      const config = {
        method: "delete",
        url: resource + "/" + id,
      };

      api(config);
    });
    return Promise.resolve({ data: params.ids });
  },
});

const uploadCapableDataProvider = addUploadFeature(
  addTagsSearchSupport(dataProvider)
);

const sometimesFailsDataProvider = new Proxy(uploadCapableDataProvider, {
  get: (target, name) => (resource: string, params: any) => {
    if (typeof name === "symbol" || name === "then") {
      return;
    }

    return uploadCapableDataProvider[name](resource, params);
  },
});

const delayedDataProvider = new Proxy(sometimesFailsDataProvider, {
  get: (target, name, self) =>
    name === "then" // as we await for the dataProvider, JS calls then on it. We must trap that call or else the dataProvider will be called with the then method
      ? self
      : (resource: string, params: any) =>
        new Promise((resolve) =>
          setTimeout(
            () =>
              resolve(
                sometimesFailsDataProvider[name as string](resource, params)
              ),
            500
          )
        ),
});

interface ResponseError extends Error {
  status?: number;
}

export default delayedDataProvider;
