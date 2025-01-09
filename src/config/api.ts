import axios from "../utils/axiosCustomize";

// Auth
const postSignUp = (fullName: string, email: string, password: string) => {
  return axios.post("User/Register", {
    name: fullName,
    email: email,
    password: password,
  });
};

const postSignIn = (email: string, password: string) => {
  return axios.post("User/Login", {
    username: email,
    password: password,
  });
};

const postLogout = () => {
  return axios.post(`auth/logout`);
};
// End Auth

// Product(client)
const getAllProducts = (page: number, size: number) => {
  return axios.get(
    `Product?filter=isDeleted : ${false}&page=${page}&size=${size}`
  );
};

const getProductById = (id: number) => {
  return axios.get(`Product/${id}`);
};
// End Product(client)

// Product(admin)
const createProduct = (
  name: string,
  unitPrice: number,
  image: File, // File thay vì string nếu bạn đang upload ảnh
  subImage1: File,
  subImage2: File,
  subImage3: File,
  brand: string,
  category: string,
  detailDescription: string
) => {
  const formData = new FormData();

  // Thêm các trường vào FormData
  formData.append("name", name);
  formData.append("unitPrice", unitPrice.toString());
  formData.append("image", image); // Thêm file image
  formData.append("brand", brand);
  formData.append("category", category);
  formData.append("detailDescription", detailDescription);
  formData.append("subImage1", subImage1);
  formData.append("subImage2", subImage2);
  formData.append("subImage3", subImage3);
  // Gửi request
  return axios.post(`Product`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

const updateProduct = (
  id: number,
  name: string,
  unitPrice: number,
  image: File, // File thay vì string nếu bạn đang upload ảnh
  subImage1: File,
  subImage2: File,
  subImage3: File,
  brand: string,
  category: string,
  detailDescription: string
) => {
  const formData = new FormData();

  // Thêm các trường vào FormData
  formData.append("id", id.toString());
  formData.append("name", name);
  formData.append("unitPrice", unitPrice.toString());
  formData.append("image", image); // Thêm file image
  formData.append("subImage1", subImage1);
  formData.append("subImage2", subImage2);
  formData.append("subImage3", subImage3);
  formData.append("brand", brand);
  formData.append("category", category);
  formData.append("detailDescription", detailDescription);

  // Gửi request
  return axios.put(`Product`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
const getAllProductsAdmin = (page: number, size: number) => {
  return axios.get(`Product?page=${page}&size=${size}`);
};

const deleteProductAdmin = (id: number) => {
  return axios.delete(`Product/${id}`);
};

const restoreProductAdmin = (id: number) => {
  return axios.get(`Product/Back/${id}`);
};
// End Product (admin)

// Service(Client)
const getAllServices = (page: number, size: number) => {
  return axios.get(
    `Service?filter=isDeleted : ${false}&page=${page}&size=${size}`
  );
};

const getServiceById = (id: number) => {
  return axios.get(`services/${id}`);
};
// End Service(client)

// Service(admin)
const getAllServicesAdmin = (page: number, size: number) => {
  return axios.get(`Service?page=${page}&size=${size}`);
};

const deleteServiceAdmin = (id: number) => {
  return axios.delete(`Service/${id}`);
};

const restoreServiceAdmin = (id: number) => {
  return axios.get(`Service/Back/${id}`);
};

const createServiceAdmin = (
  name: string,
  price: number,
  shortDesc: string,
  detailDesc: string,
  image: File
) => {
  const formData = new FormData();
  formData.append("name", name);
  formData.append("price", price.toString());
  formData.append("shortDesc", shortDesc);
  formData.append("detailDesc", detailDesc);
  formData.append("image", image);

  return axios.post(`Service`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

const updateServiceAdmin = (
  id: number,
  name: string,
  price: number,
  description: string,
  image: File
) => {
  const formData = new FormData();
  formData.append("id", id.toString());
  formData.append("name", name);
  formData.append("price", price.toString());
  formData.append("shortDesc", description);
  formData.append("detailDesc", description);
  formData.append("image", image);

  return axios.put(`Service`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
// End Service(Admin)

// Category(client)
const getAllCategories = (page: number, size: number) => {
  return axios.get(
    `Category?filter=isDeleted : ${false}&page=${page}&size=${size}`
  );
};
// end Category(client)

// Category(Admin)
const getAllCategoriesAdmin = (page: number, size: number) => {
  return axios.get(`Category?page=${page}&size=${size}`);
};

const deleteCategoryAdmin = (id: number) => {
  return axios.delete(`Category/${id}`);
};

const restoreCategoryAdmin = (id: number) => {
  return axios.get(`Category/Back/${id}`);
};

const createCategoryAdmin = (name: string) => {
  return axios.post(`Category`, {
    name: name,
    deleted: false,
  });
};

const updateCategoryAdmin = (id: number, name: string) => {
  return axios.put(`Category`, {
    id: id,
    name: name,
  });
};
// End Category(Admin)

// Service Ticket(client)
const bookServiceClient = (
  cusId: number,
  cusName: string,
  cusPhone: string,
  date: string,
  serviceName: string,
  totalPrice: number
) => {
  const formData = new FormData();
  formData.append("cusId", cusId.toString());
  formData.append("cusName", cusName);
  formData.append("cusPhone", cusPhone);
  formData.append("date", date);
  formData.append("serviceName", serviceName);
  formData.append("totalPrice", totalPrice.toString());

  return axios.post(`ServiceTickets/Client`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
// End Service Ticket(client)

// Service Ticket(Admin)
const getAllServiceTicketAdmin = (page: number, size: number) => {
  return axios.get(`ServiceTickets?page=${page}&size=${size}`);
};

const confirmServiceTicket = (id: number) => {
  const formData = new FormData();
  formData.append("id", id.toString());

  return axios.post(`ServiceTickets/confirmServiceTicket`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

const confirmCheckoutServiceTicket = (id: number) => {
  const formData = new FormData();
  formData.append("id", id.toString());

  return axios.post(`ServiceTickets/confirmCheckout`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

const getDetailServiceTicketAdmin = (id: number) => {
  return axios.get(`ServiceTickets/Detail/${id}`);
};

const bookingServiceAdmin = (
  cusName: string,
  cusPhone: string,
  date: string,
  totalPrice: number,
  listServices: string[][]
) => {
  const formData = new FormData();
  formData.append("cusName", cusName);
  formData.append("cusPhone", cusPhone);
  formData.append("date", date);
  formData.append("totalPrice", totalPrice.toString());
  formData.append("listServices", listServices as any);

  return axios.post(`ServiceTickets/Admin`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
// End Service Ticket(Admin)

// Import ticket (Admin)
const createImportTicketAdmin = (
  supplierName: string,
  date: string,
  totalPrice: number,
  listProducts: { productName: string; importPrice: number; quantity: number }[]
) => {
  return axios.post(`ImportTicket/Create`, {
    supplierName: supplierName,
    date: date,
    totalPrice: totalPrice,
    listProducts: listProducts,
  });
};

const getAllImportTickets = (page: number, size: number) => {
  return axios.get(`ImportTickets?page=${page}&size=${size}`);
};

const completeImportTicket = (id: number) => {
  const formData = new FormData();
  formData.append("id", id.toString());
  return axios.post(`ImportTicket/CompleteTicket`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

const deleteImportTicket = (id: number) => {
  return axios.delete(`ImportTicket/${id}`);
};

const getDetailImportTicket = (id: number) => {
  return axios.get(`ImportTicket/Detail/${id}`);
};
// End Import Ticket (Admin)

// Supplier
const getAllSuppliers = (page: number, size: number) => {
  return axios.get(`Suppliers?page=${page}&size=${size}`);
};

const getAllSuppliersActive = (page: number, size: number) => {
  return axios.get(
    `Suppliers?page=${page}&size=${size}&filter=isDeleted: false`
  );
};

const createSupplier = (
  address: string,
  email: string,
  name: string,
  phone: string
) => {
  return axios.post(`Supplier`, {
    address: address,
    email: email,
    name: name,
    phone: phone,
  });
};

const updateSupplier = (
  id: number,
  name: string,
  email: string,
  address: string,
  phone: string
) => {
  return axios.put(`Supplier`, {
    id: id,
    name: name,
    email: email,
    address: address,
    phone: phone,
  });
};

const deleteSupplier = (id: number) => {
  return axios.delete(`Supplier/${id}`);
};

const restoreSupplier = (id: number) => {
  return axios.get(`Supplier/Back/${id}`);
};
// End Supplier

// Cart
const updateQtyItemCart = (
  email: string,
  productId: number,
  quantity: number
) => {
  const formData = new FormData();
  formData.append("email", email);
  formData.append("productId", productId.toString());
  formData.append("quantity", quantity.toString());
  return axios.post(`Cart/AddProductToCart`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

const getCartByUser = (email: string) => {
  return axios.get(`Cart/GetCart`, {
    params: { email },
  });
};

const deleteProductFromCart = (email: string, productId: number[]) => {
  const formData = new FormData();
  formData.append("email", email);
  formData.append("productId", productId as any);

  return axios.post(`Cart/DeleteProductFromCart`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
// End Cart

// Product review
const createCommentProduct = (
  productId: number,
  email: string,
  reviewSummary: string,
  detailReview: string,
  date: string,
  rating: number
) => {
  return axios.post(`ProductReview/CreateComment`, {
    productId: productId,
    email: email,
    reviewSummary: reviewSummary,
    detailReview: detailReview,
    date: date,
    rating: rating,
  });
};

const getAllProductReviewByProduct = (
  page: number,
  size: number,
  productId: number
) => {
  return axios.get(
    `ProductReviews?page=${page}&size=${size}&filter=product.id : ${productId}`
  );
};

const deleteProductReview = (id: number) => {
  return axios.delete(`ProductReviews/${id}`);
};

const updateProductReview = (
  id: number,
  rating: number,
  detailReview: string,
  reviewSummary: string
) => {
  return axios.put(`ProductReviews`, {
    id: id,
    rating: rating,
    detailReview: detailReview,
    reviewSummary: reviewSummary,
  });
};

// End Product review

// Store Review
const createCommentStore = (
  email: string,
  productQuality: number,
  serviceQuality: number,
  deliveryQuality: number,
  title: string,
  comment: string,
  date: string
) => {
  return axios.post(`StoreReviews`, {
    email: email,
    productQuality: productQuality,
    serviceQuality: serviceQuality,
    deliveryQuality: deliveryQuality,
    title: title,
    comment: comment,
    date: date,
  });
};

const getAllCommentStore = (page: number, size: number) => {
  return axios.get(`StoreReviews?page=${page}&size=${size}`);
};

const deleteStoreReview = (id: number) => {
  return axios.delete(`StoreReviews/${id}`);
};

const updateStoreReview = (
  id: number,
  productQuality: number,
  serviceQuality: number,
  deliveryQuality: number,
  title: string,
  comment: string
) => {
  return axios.put(`StoreReviews`, {
    id: id,
    productQuality: productQuality,
    serviceQuality: serviceQuality,
    deliveryQuality: deliveryQuality,
    title: title,
    comment: comment,
  });
};

const responseComment = (id: number, response: string) => {
  const formData = new FormData();
  formData.append("id", id.toString());
  formData.append("response", response);

  return axios.put(`StoreReviews/Response`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

// End store review

// User
const updateUserClient = (
  email: string,
  name: string,
  birthDay: string,
  phoneNumber: string,
  address: string,
  userImage: File
) => {
  const formData = new FormData();
  formData.append("email", email);
  formData.append("name", name);
  formData.append("birthDay", birthDay);
  formData.append("phoneNumber", phoneNumber);
  formData.append("address", address);
  formData.append("userImage", userImage);
  return axios.put(`Users/UpdateClient`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

const createUserAdmin = (
  name: string,
  email: string,
  password: string,
  role: string
) => {
  return axios.post(`Users/CreateUserAdmin`, {
    name: name,
    email: email,
    password: password,
    role: {
      name: role,
    },
  });
};

const deleteUserAmin = (id: number) => {
  return axios.delete(`Users/${id}`);
};

const getUserAdmin = (id: number) => {
  return axios.get(`Users/${id}`);
};

const updateUserAdmin = (
  id: number,
  name: string,
  email: string,
  role: string
) => {
  return axios.put(`Users`, {
    id: id,
    name: name,
    email: email,
    role: {
      name: role,
    },
  });
};

const getAllUsersAdmin = (page: number, size: number) => {
  return axios.get(`Users?page=${page}&size=${size}`);
};

const changePassword = (
  email: string,
  oldPassword: string,
  newPassword: string
) => {
  const formData = new FormData();
  formData.append("email", email);
  formData.append("oldPassword", oldPassword);
  formData.append("password", newPassword);
  return axios.post(`Users/ChangePassword`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
// End User

// Permission
const getAllPermissions = (page: number, size: number) => {
  return axios.get(`permissions?page=${page}&size=${size}`);
};

const getAllPermissionsNotDelete = (page: number, size: number) => {
  return axios.get(
    `permissions?page=${page}&size=${size}&filter=isDeleted : ${false}`
  );
};

const createPermission = (
  name: string,
  apiPath: string,
  method: string,
  module: string
) => {
  return axios.post(`permissions`, {
    name: name,
    apiPath: apiPath,
    method: method,
    module: module,
  });
};

const updatePermission = (
  id: number,
  name: string,
  apiPath: string,
  method: string,
  module: string
) => {
  return axios.put(`permissions`, {
    id: id,
    name: name,
    apiPath: apiPath,
    method: method,
    module: module,
  });
};

const deletePermission = (id: number) => {
  return axios.delete(`permissions/${id}`);
};

const restorePermission = (id: number) => {
  return axios.get(`permissions/restore/${id}`);
};
// End permission

// Role
const getAllRoles = (page: number, size: number) => {
  return axios.get(`roles?page=${page}&size=${size}`);
};

const getAllRolesActive = (page: number, size: number) => {
  return axios.get(`roles?page=${page}&size=${size}&filter=active : true`);
};

const getRoleById = (id: number) => {
  return axios.get(`roles/${id}`);
};

const createNewRole = (
  name: string,
  description: string,
  active: boolean,
  permissions: { id: number }[]
) => {
  return axios.post("roles", {
    name: name,
    description: description,
    active: active,
    permissions: permissions,
  });
};

const updateRole = (
  id: number,
  name: string,
  description: string,
  active: boolean,
  permissions: { id: number }[]
) => {
  return axios.put(`roles`, {
    id: id,
    name: name,
    description: description,
    active: active,
    permissions: permissions,
  });
};

const deleteRole = (id: number) => {
  return axios.delete(`roles/${id}`);
};

const disableRole = (id: number) => {
  return axios.get(`roles/disable/${id}`);
};

const activeRole = (id: number) => {
  return axios.get(`roles/active/${id}`);
};
// End Role

// Discount

// End Discount

// Sale Ticket
const createSaleTicketClient = (
  email: string,
  date: string,
  total: number,
  discountId: number,
  listProducts: {
    productName: string;
    quantity: number;
  }[]
) => {
  return axios.post(`SaleTickets/Client`, {
    email: email,
    date: date,
    total: total,
    discountId: discountId,
    listProducts: listProducts,
  });
};

const createSaleTicketAdmin = (
  cusName: string,
  phoneNumber: string,
  address: string,
  date: string,
  totalPrice: number,
  voucherId: number,
  listProducts: {
    productName: string;
    quantity: number;
  }[]
) => {
  return axios.post(`SaleTickets/CreateTicketAdmin`, {
    cusName: cusName,
    phoneNumber: phoneNumber,
    address: address,
    date: date,
    totalPrice: totalPrice,
    voucherId: voucherId,
    listProducts: listProducts,
  });
};

const getAllSaleTicketByUser = (email: string) => {
  return axios.get(`SaleTickets/Client/GetAllSaleTickets`, {
    params: { email },
  });
};

const getDetailOfSaleTicket = (id: number) => {
  return axios.get(`SaleTickets/Clients/GetDetail/${id}`);
};

const confirmCompleteSaleTicket = (id: number) => {
  const formData = new FormData();
  formData.append("id", id.toString());
  return axios.post(`SaleTickets/ConfirmComplete`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

const confirmDeliverySaleTicket = (id: number) => {
  const formData = new FormData();
  formData.append("id", id.toString());
  return axios.post(`SaleTickets/ConfirmDelivery`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

const getAllSaleTickets = (page: number, size: number) => {
  return axios.get(`SaleTickets?page=${page}&size=${size}`);
};

const deleteSaleTicket = (id: number) => {
  return axios.delete(`SaleTickets/${id}`);
};
// End Sale Ticket

// Voucher
const getVoucherById = (id: number) => {
  return axios.get(`Voucher/${id}`);
};

const createVoucher = (
  name: string,
  discountValue: number,
  percentage: boolean
) => {
  return axios.post(`Voucher`, {
    name: name,
    discountValue: discountValue,
    percentage: percentage,
  });
};

const deleteVoucher = (id: number) => {
  return axios.delete(`Voucher/${id}`);
};

const restoreVoucher = (id: number) => {
  return axios.get(`Voucher/Back/${id}`);
};

const getAllVouchers = (page: number, size: number) => {
  return axios.get(`Voucher?page=${page}&size=${size}`);
};

const updateVoucher = (
  id: number,
  name: string,
  discountValue: number,
  percentage: boolean
) => {
  return axios.put(`Voucher`, {
    id: id,
    name: name,
    discountValue: discountValue,
    percentage: percentage,
  });
};
// End Voucher

// Inventory
const saveInventory = (month: number, year: number) => {
  const formData = new FormData();
  formData.append("month", month.toString());
  formData.append("year", year.toString());
  return axios.post(`Inventory/Save`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

const getInventoryDetail = (month: number, year: number) => {
  return axios.get(`Inventory/Detail`, {
    params: {
      month: month,
      year: year,
    },
  });
};
// End inventory

// Email
const sendEmailThankYou = (email: string, cusName: string) => {
  return axios.get(`Email/Thankyou`, {
    params: {
      email: email,
      cusName: cusName,
    },
  });
};

const sendEmailForgotPassword = (email: string) => {
  return axios.get(`Email/ForgotPassword`, {
    params: {
      email: email,
    },
  });
};
// End email

export {
  postSignUp,
  postSignIn,
  postLogout,
  updateUserClient,
  createUserAdmin,
  deleteUserAmin,
  updateUserAdmin,
  getUserAdmin,
  getAllUsersAdmin,
  changePassword,
  //
  getAllProducts,
  getProductById,
  getAllProductsAdmin,
  createProduct,
  deleteProductAdmin,
  restoreProductAdmin,
  updateProduct,
  //
  getAllCategories,
  getAllCategoriesAdmin,
  createCategoryAdmin,
  deleteCategoryAdmin,
  restoreCategoryAdmin,
  updateCategoryAdmin,
  //
  getCartByUser,
  updateQtyItemCart,
  deleteProductFromCart,
  //
  getAllProductReviewByProduct,
  createCommentProduct,
  deleteProductReview,
  updateProductReview,
  //
  getAllCommentStore,
  createCommentStore,
  deleteStoreReview,
  updateStoreReview,
  responseComment,
  //
  getAllServices,
  getServiceById,
  bookServiceClient,
  getAllServicesAdmin,
  createServiceAdmin,
  deleteServiceAdmin,
  restoreServiceAdmin,
  updateServiceAdmin,
  getAllServiceTicketAdmin,
  confirmServiceTicket,
  confirmCheckoutServiceTicket,
  getDetailServiceTicketAdmin,
  bookingServiceAdmin,
  //
  getAllImportTickets,
  createImportTicketAdmin,
  deleteImportTicket,
  getDetailImportTicket,
  completeImportTicket,
  getAllSuppliers,
  getAllSuppliersActive,
  createSupplier,
  deleteSupplier,
  restoreSupplier,
  updateSupplier,
  //
  getAllPermissions,
  getAllPermissionsNotDelete,
  createPermission,
  deletePermission,
  restorePermission,
  updatePermission,
  getAllRoles,
  getAllRolesActive,
  getRoleById,
  createNewRole,
  updateRole,
  deleteRole,
  disableRole,
  activeRole,
  //
  createSaleTicketClient,
  getAllSaleTicketByUser,
  getDetailOfSaleTicket,
  createSaleTicketAdmin,
  confirmCompleteSaleTicket,
  confirmDeliverySaleTicket,
  getAllSaleTickets,
  deleteSaleTicket,
  //
  getVoucherById,
  createVoucher,
  deleteVoucher,
  updateVoucher,
  restoreVoucher,
  getAllVouchers,
  //
  saveInventory,
  getInventoryDetail,
  //
  sendEmailThankYou,
  sendEmailForgotPassword,
};
