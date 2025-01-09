import Voucher, { sampleVouchers } from "../entities/Voucher";
import { sampleProducts } from "./Product";

export default interface SaleTicket {
  id: string;
  total: number;
  date: string;
  status: string;
  discount?: Voucher;
  listProducts: Array<{
    product: {
      unitPrice: number;
      productImage: string;
      name: string;
    };
    quantity: number;
  }>;
}

export const sampleSaleTickets: SaleTicket[] = [
  {
    id: "2",
    total: 77,
    date: "2025-01-01 10:22:17.372000",
    status: "DELIVERING",
    discount: sampleVouchers[2],
    listProducts: [
      {
        product: {
          unitPrice: sampleProducts[1].price,
          productImage: sampleProducts[1].images[0],
          name: sampleProducts[1].name,
        },
        quantity: 1,
      },
    ],
  },
  {
    id: "3",
    total: 100,
    date: "2025-01-01 10:24:54.341000",
    status: "COMPLETED",
    listProducts: [
      {
        product: {
          unitPrice: sampleProducts[7].price,
          productImage: sampleProducts[7].images[0],
          name: sampleProducts[7].name,
        },
        quantity: 1,
      },
    ],
  },
  {
    id: "4",
    total: 94,
    date: "2025-01-01 10:26:05.042000",
    status: "COMPLETED",
    listProducts: [
      {
        product: {
          unitPrice: sampleProducts[6].price,
          productImage: sampleProducts[6].images[0],
          name: sampleProducts[6].name,
        },
        quantity: 1,
      },
    ],
  },
  {
    id: "5",
    total: 235,
    date: "2025-01-01 10:29:12.091000",
    status: "COMPLETED",
    listProducts: [
      {
        product: {
          unitPrice: sampleProducts[5].price,
          productImage: sampleProducts[5].images[0],
          name: sampleProducts[5].name,
        },
        quantity: 1,
      },
      {
        product: {
          unitPrice: sampleProducts[4].price,
          productImage: sampleProducts[4].images[0],
          name: sampleProducts[4].name,
        },
        quantity: 1,
      },
    ],
  },
  {
    id: "6",
    total: 90,
    date: "2025-01-01 00:00:00.000000",
    status: "PREPARING",
    discount: sampleVouchers[0],
    listProducts: [
      {
        product: {
          unitPrice: sampleProducts[0].price,
          productImage: sampleProducts[0].images[0],
          name: sampleProducts[0].name,
        },
        quantity: 3,
      },
    ],
  },
  {
    id: "8",
    total: 125,
    date: "2025-01-01 17:09:21.133000",
    status: "COMPLETED",
    discount: sampleVouchers[0],
    listProducts: [
      {
        product: {
          unitPrice: sampleProducts[10].price,
          productImage: sampleProducts[10].images[0],
          name: sampleProducts[10].name,
        },
        quantity: 2,
      },
    ],
  },
  {
    id: "9",
    total: 320,
    date: "2025-01-01 17:24:07.105000",
    status: "DELIVERING",
    listProducts: [
      {
        product: {
          unitPrice: sampleProducts[5].price,
          productImage: sampleProducts[5].images[0],
          name: sampleProducts[5].name,
        },
        quantity: 3,
      },
    ],
  },
  {
    id: "19",
    total: 155,
    date: "2025-01-02 17:01:12.091000",
    status: "COMPLETED",
    discount: sampleVouchers[0],
    listProducts: [
      {
        product: {
          unitPrice: sampleProducts[1].price,
          productImage: sampleProducts[1].images[0],
          name: sampleProducts[1].name,
        },
        quantity: 2,
      },
      {
        product: {
          unitPrice: sampleProducts[0].price,
          productImage: sampleProducts[0].images[0],
          name: sampleProducts[0].name,
        },
        quantity: 2,
      },
    ],
  },
  {
    id: "21",
    total: 85,
    date: "2025-01-08 06:14:32.111000",
    status: "COMPLETED",
    listProducts: [
      {
        product: {
          unitPrice: sampleProducts[2].price,
          productImage: sampleProducts[2].images[0],
          name: sampleProducts[2].name,
        },
        quantity: 2,
      },
    ],
  },
  {
    id: "22",
    total: 125,
    date: "2025-01-08 15:48:08.091000",
    status: "PREPARING",
    listProducts: [
      {
        product: {
          unitPrice: sampleProducts[0].price,
          productImage: sampleProducts[0].images[0],
          name: sampleProducts[0].name,
        },
        quantity: 2,
      },
    ],
  },
  {
    id: "23",
    total: 245,
    date: "2025-01-09 08:05:24.768000",
    status: "PREPARING",
    discount: sampleVouchers[0],
    listProducts: [
      {
        product: {
          unitPrice: sampleProducts[1].price,
          productImage: sampleProducts[1].images[0],
          name: sampleProducts[1].name,
        },
        quantity: 4,
      },
      {
        product: {
          unitPrice: sampleProducts[2].price,
          productImage: sampleProducts[2].images[0],
          name: sampleProducts[2].name,
        },
        quantity: 3,
      },
    ],
  },
];
