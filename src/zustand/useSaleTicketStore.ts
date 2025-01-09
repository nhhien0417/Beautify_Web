import { create } from "zustand";
import {
  getAllSaleTicketByUser,
  getDetailOfSaleTicket,
  createSaleTicketClient,
  confirmCompleteSaleTicket,
} from "../config/api"; // Assuming you have a function `updateSaleTicketStatusClient`
import SaleTicket from "../entities/SaleTicket";
import { useUserStore } from "./useUserStore";
import { formatDate } from "../services/date";

interface SaleTicketState {
  saleTickets: SaleTicket[];
  totalTickets: number;

  fetchSaleTickets: () => Promise<void>;
  addSaleTicket: (newSaleTicket: SaleTicket) => Promise<void>;
  updateSaleTicketStatus: (id: string, status: string) => Promise<void>;
}

const useSaleTicketStore = create<SaleTicketState>((set) => ({
  saleTickets: [],
  totalTickets: 0,

  fetchSaleTickets: async () => {
    const { isAuthenticated, account } = useUserStore.getState();
    if (!isAuthenticated) return;
    if (account && account.email) {
      try {
        const response = await getAllSaleTicketByUser(account.email);
        const tickets = response.data.map(
          (saleTicket: {
            id: number;
            user: { name: string };
            date: string;
            total: number;
            status: "PREPARING" | "DELIVERING" | "COMPLETED";
          }) => ({
            id: saleTicket.id.toString(),
            customer: saleTicket.user.name,
            date: saleTicket.date,
            total: saleTicket.total,
            status: saleTicket.status,
          })
        );

        tickets.sort(
          (
            a: {
              status: "PREPARING" | "DELIVERING" | "COMPLETED";
              date: string;
            },
            b: {
              status: "PREPARING" | "DELIVERING" | "COMPLETED";
              date: string;
            }
          ) => {
            const statusOrder: {
              [key in "PREPARING" | "DELIVERING" | "COMPLETED"]: number;
            } = { PREPARING: 1, DELIVERING: 2, COMPLETED: 3 };
            if (statusOrder[a.status] !== statusOrder[b.status]) {
              return statusOrder[a.status] - statusOrder[b.status];
            }
            return new Date(b.date).getTime() - new Date(a.date).getTime();
          }
        );

        const formattedTickets = tickets.map((ticket: any) => ({
          ...ticket,
          date: formatDate(ticket.date),
        }));

        const ticketsWithDetails = await Promise.all(
          formattedTickets.map(async (ticket: { id: any }) => {
            const detailResponse = await getDetailOfSaleTicket(
              Number(ticket.id)
            );
            return {
              ...ticket,
              listProducts: detailResponse.data.listProducts,
            };
          })
        );

        // Update store with tickets and total
        set({
          saleTickets: ticketsWithDetails,
          totalTickets: ticketsWithDetails.length,
        });
      } catch (error) {
        console.error("Error fetching sale tickets or details:", error);
      }
    }
  },

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
