import { create } from "zustand";
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

  addSaleTicket: async (_: SaleTicket) => {
    const { isAuthenticated } = useUserStore.getState();
    if (!isAuthenticated) return;

    set((state) => ({
      saleTickets: [_, ...state.saleTickets],
      totalTickets: state.saleTickets.length + 1,
    }));
  },

  updateSaleTicketStatus: async (id: string, status: string) => {
    const { isAuthenticated } = useUserStore.getState();
    if (!isAuthenticated) return;

    set((state) => {
      const updatedSaleTickets = state.saleTickets.map((ticket) =>
        ticket.id === id ? { ...ticket, status } : ticket
      );
      return {
        saleTickets: updatedSaleTickets,
      };
    });

    console.log(`Sale ticket status updated to ${status}`);
  },
}));

export default useSaleTicketStore;
