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
  ,create
  ,update
  ,remove
  ,search
  ,getFormEdit
  ,getFormCreate
  ,defaultActions : {
    get: "/get",
    create: "/create",
    update: "/update",
    remove: "/remove",
    search: "/search",
    paginate: "/paginate",
    formEdit: "/form/edit",
    formCreate: "/form/create",
  }
}
