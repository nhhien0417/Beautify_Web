export const ALL_PERMISSION = {
  PRODUCT: {
    GET_PAGINATE: { method: "GET", apiPath: "/Product", module: "PRODUCT" },
    CREATE: { method: "POST", apiPath: "/Product", module: "PRODUCT" },
    UPDATE: { method: "PUT", apiPath: "/Product", module: "PRODUCT" },
    DELETE: { method: "DELETE", apiPath: "/Product/{id}", module: "PRODUCT" },
    RESTORE: {
      method: "GET",
      apiPath: "/Product/Back/{id}",
      module: "PRODUCT",
    },
    DETAIL: { method: "GET", apiPath: "/Product/{id}", module: "PRODUCT" },
  },

  CATEGORY: {
    GET_PAGINATE: { method: "GET", apiPath: "/Category", module: "CATEGORY" },
    CREATE: { method: "POST", apiPath: "/Category", module: "CATEGORY" },
    UPDATE: { method: "PUT", apiPath: "/Category", module: "CATEGORY" },
    DELETE: { method: "DELETE", apiPath: "/Category/{id}", module: "CATEGORY" },
    RESTORE: {
      method: "GET",
      apiPath: "/Category/Back/{id}",
      module: "CATEGORY",
    },
    DETAIL: { method: "GET", apiPath: "/Category/{id}", module: "CATEGORY" },
  },

  IMPORT_TICKET: {
    GET_PAGINATE: {
      method: "GET",
      apiPath: "/ImportTickets",
      module: "IMPORT_TICKET",
    },
    CREATE_IMPORT_TICKET: {
      method: "POST",
      apiPath: "/ImportTicket/Create",
      module: "IMPORT_TICKET",
    },
    COMPLETE_IMPORT_TICKET: {
      method: "POST",
      apiPath: "/ImportTicket/CompleteTicket",
      module: "IMPORT_TICKET",
    },
    DELETE_IMPORT_TICKET: {
      method: "DELETE",
      apiPath: "/ImportTicket/{id}",
      module: "IMPORT_TICKET",
    },
    DETAIL: {
      method: "GET",
      apiPath: "/ImportTicket/Detail/{id}",
      module: "IMPORT_TICKET",
    },
  },

  PERMISSION: {
    GET_PAGINATE: {
      method: "GET",
      apiPath: "/permissions",
      module: "PERMISSION",
    },
    CREATE: { method: "POST", apiPath: "/permissions", module: "PERMISSION" },
    UPDATE: { method: "PUT", apiPath: "/permissions", module: "PERMISSION" },
    DELETE: {
      method: "DELETE",
      apiPath: "/permissions/{id}",
      module: "PERMISSION",
    },
    RESTORE: {
      method: "GET",
      apiPath: "/permissions/restore/{id}",
      module: "PERMISSION",
    },
  },

  ROLE: {
    GET_PAGINATE: { method: "GET", apiPath: "/roles", module: "ROLE" },
    CREATE: { method: "POST", apiPath: "/roles", module: "ROLE" },
    UPDATE: { method: "PUT", apiPath: "/roles", module: "ROLE" },
    DELETE: { method: "DELETE", apiPath: "/roles", module: "ROLE" },
    DETAIL: { method: "GET", apiPath: "/roles/{id}", module: "ROLE" },
  },

  SERVICE: {
    GET_PAGINATE: { method: "GET", apiPath: "/Service", module: "SERVICE" },
    CREATE: { method: "POST", apiPath: "/Service", module: "SERVICE" },
    UPDATE: { method: "PUT", apiPath: "/Service", module: "SERVICE" },
    DELETE: { method: "DELETE", apiPath: "/Service/{id}", module: "SERVICE" },
    RESTORE: {
      method: "GET",
      apiPath: "/Service/Back/{id}",
      module: "SERVICE",
    },
    DETAIL: { method: "GET", apiPath: "/services/{id}", module: "SERVICE" },
  },

  SERVICE_TICKET: {
    GET_PAGINATE: {
      method: "GET",
      apiPath: "/ServiceTickets",
      module: "SERVICE_TICKET",
    },
    CREATE: {
      method: "POST",
      apiPath: "/ServiceTickets/Admin",
      module: "SERVICE_TICKET",
    },
    CONFIRM_SERVICE_TICKET: {
      method: "POST",
      apiPath: "/ServiceTickets/confirmServiceTicket",
      module: "SERVICE_TICKET",
    },
    CONFIRM_CHECKOUT: {
      method: "POST",
      apiPath: "/ServiceTickets/confirmCheckout",
      module: "SERVICE_TICKET",
    },
    DETAIL: {
      method: "GET",
      apiPath: "/ServiceTickets/Detail/{id}",
      module: "SERVICE_TICKET",
    },
  },

  SUPPLIER: {
    GET_PAGINATE: { method: "GET", apiPath: "/Suppliers", module: "SUPPLIER" },
    CREATE: { method: "POST", apiPath: "/Supplier", module: "SUPPLIER" },
    UPDATE: { method: "PUT", apiPath: "/Supplier", module: "SUPPLIER" },
    DELETE: { method: "DELETE", apiPath: "/Supplier/{id}", module: "SUPPLIER" },
    RESTORE: {
      method: "GET",
      apiPath: "/Supplier/Back/{id}",
      module: "SUPPLIER",
    },
    DETAIL: { method: "GET", apiPath: "/Supplier/{id}", module: "SUPPLIER" },
  },

  VOUCHER: {
    GET_PAGINATE: { method: "GET", apiPath: "/Voucher", module: "VOUCHER" },
    CREATE: { method: "POST", apiPath: "/Voucher", module: "VOUCHER" },
    UPDATE: { method: "PUT", apiPath: "/Voucher", module: "VOUCHER" },
    DELETE: { method: "DELETE", apiPath: "/Voucher/{id}", module: "VOUCHER" },
    RESTORE: {
      method: "GET",
      apiPath: "/Voucher/Back/{id}",
      module: "VOUCHER",
    },
    DETAIL: { method: "GET", apiPath: "/Voucher/{id}", module: "VOUCHER" },
  },

  ORDER_TICKET: {
    GET_PAGINATE: {
      method: "GET",
      apiPath: "/SaleTickets",
      module: "ORDER_TICKET",
    },
    CREATE: {
      method: "POST",
      apiPath: "/SaleTickets/Client",
      module: "ORDER_TICKET",
    },
    CREATE_ADMIN: {
      method: "POST",
      apiPath: "/SaleTickets/CreateTicketAdmin",
      module: "ORDER_TICKET",
    },
    CONFIRM_COMPLETE: {
      method: "POST",
      apiPath: "/SaleTickets/ConfirmComplete",
      module: "ORDER_TICKET",
    },
    CONFIRM_DELIVERY: {
      method: "POST",
      apiPath: "/SaleTickets/ConfirmComplete",
      module: "ORDER_TICKET",
    },
    DELETE: {
      method: "DELETE",
      apiPath: "/SaleTickets/{id}",
      module: "ORDER_TICKET",
    },
    DETAIL: {
      method: "GET",
      apiPath: "/SaleTickets/Clients/GetDetail/{id}",
      module: "ORDER_TICKET",
    },
  },

  INVENTORY: {
    GET_PAGINATE: {
      method: "POST",
      apiPath: "/Inventory/Save",
      module: "INVENTORY",
    },
    GET_DETAIL: {
      method: "GET",
      apiPath: "/Inventory/Detail",
      module: "INVENTORY",
    },
  },

  USER: {
    GET_PAGINATE: {
      method: "GET",
      apiPath: "/Users",
      module: "USER",
    },
    UPDATE: {
      method: "PUT",
      apiPath: "/Users",
      module: "USER",
    },
    CREATE: {
      method: "POST",
      apiPath: "/Users/CreateUserAdmin",
      module: "USER",
    },
  },
};

export const ALL_MODULES = {
  PRODUCT: "PRODUCT",
  CATEGORY: "CATEGORY",
  IMPORT_TICKET: "IMPORT_TICKET",
  PERMISSION: "PERMISSION",
  ROLE: "ROLE",
  SERVICE: "SERVICE",
  SERVICE_TICKET: "SERVICE_TICKET",
  SUPPLIER: "SUPPLIER",
  VOUCHER: "VOUCHER",
  ORDER_TICKET: "ORDER_TICKET",
  INVENTORY: "INVENTORY",
  USER: "USER",
};
