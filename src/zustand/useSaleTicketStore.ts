import { create } from "zustand";
import {
  createSaleTicketClient,
  confirmCompleteSaleTicket,
} from "../config/api"; // Assuming you have a function `updateSaleTicketStatusClient`
import SaleTicket, { sampleSaleTickets } from "../entities/SaleTicket";
import { useUserStore } from "./useUserStore";

interface SaleTicketState {
  saleTickets: SaleTicket[];
  totalTickets: number;

  addSaleTicket: (newSaleTicket: SaleTicket) => Promise<void>;
  updateSaleTicketStatus: (id: string, status: string) => Promise<void>;
}

const useSaleTicketStore = create<SaleTicketState>((set) => ({
  saleTickets: sampleSaleTickets,
  totalTickets: 11,

  addSaleTicket: async (newSaleTicket: SaleTicket) => {
    const { isAuthenticated, account } = useUserStore.getState();
    if (!isAuthenticated) return;

    const productList = newSaleTicket.listProducts.map((item) => ({
      productName: item.product.name,
      quantity: item.quantity,
    }));

    try {
      const response = await createSaleTicketClient(
        account.email,
        newSaleTicket.date,
        newSaleTicket.total,
        Number(newSaleTicket.discount ? newSaleTicket.discount.id : null),
        productList
      );

      const saleTicket = {
        id: response.data.id,
        total: newSaleTicket.total,
        date: newSaleTicket.date,
        status: response.data.status,
        discount: newSaleTicket.discount,
        listProducts: newSaleTicket.listProducts,
      };

      set((state) => ({
        saleTickets: [saleTicket, ...state.saleTickets],
        totalTickets: state.saleTickets.length + 1,
      }));
    } catch (error) {
      console.error("Error adding sale ticket:", error);
    }
  },

  updateSaleTicketStatus: async (id: string, status: string) => {
    const { isAuthenticated } = useUserStore.getState();
    if (!isAuthenticated) return;

    try {
      await confirmCompleteSaleTicket(+id);
      set((state) => {
        const updatedSaleTickets = state.saleTickets.map((ticket) =>
          ticket.id === id ? { ...ticket, status } : ticket
        );
        return {
          saleTickets: updatedSaleTickets,
        };
      });

      console.log(`Sale ticket status updated to ${status}`);
    } catch (error) {
      console.error("Error updating sale ticket status:", error);
    }
  },
}));

export default useSaleTicketStore;
