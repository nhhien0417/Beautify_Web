import { create } from "zustand";
import { getAllServices } from "../config/api";
import Service from "../entities/Service";

interface ServiceState {
  services: Service[];
  searchQuery: string;
  filteredServices: Service[];
  fetchServices: () => Promise<void>;
  setSearchQuery: (query: string) => void;
}

const useServiceStore = create<ServiceState>((set) => ({
  services: [],
  searchQuery: "",
  filteredServices: [],

  fetchServices: async () => {
    try {
      const response = await getAllServices(1, 100);
      const { result } = response.data;

      const fetchedServices = result.map((item: any) => ({
        id: item.id,
        name: item.name,
        description: item.shortDescription,
        price: item.price,
        image: `http://localhost:8080${item.serviceImage}`,
      }));

      set({
        services: fetchedServices,
        filteredServices: fetchedServices,
      });
    } catch (error) {
      console.error("Failed to fetch services:", error);
    }
  },

  setSearchQuery: (query: string) => {
    set((state) => {
      const filtered = state.services.filter((service) =>
        service.name.toLowerCase().includes(query.toLowerCase())
      );

      return {
        searchQuery: query,
        filteredServices: filtered.length > 0 ? filtered : state.services,
      };
    });
  },
}));

export default useServiceStore;
