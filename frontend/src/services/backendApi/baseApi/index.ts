import { api } from "./api"
import { create } from "./create"
import { get } from "./get"
import { getFormCreate } from "./getFormCreate"
import { getFormEdit } from "./getFormEdit"
import { remove } from "./remove"
import { search } from "./search"
import { update } from "./update"

export const baseApi = {
  api
  ,get
  ,update
  ,create
  ,search
  ,remove
  ,getFormCreate
  ,getFormEdit
  ,defaultActions : {
    get: "/get",
    list: "/list",
    search: "/search",
    paginate: "/paginate",
    formEdit: "/form/edit",
    formCreate: "/form/create",
    create: "/create",
    update: "/update",
    delete: "/delete",
  }
}
