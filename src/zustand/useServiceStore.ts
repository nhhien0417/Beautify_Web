import { create } from "zustand";
import Service, { sampleServices } from "../entities/Service";

interface ServiceState {
  services: Service[];
  searchQuery: string;
  filteredServices: Service[];
  setSearchQuery: (query: string) => void;
}

const useServiceStore = create<ServiceState>((set) => ({
  services: sampleServices,
  searchQuery: "",
  filteredServices: sampleServices,

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
