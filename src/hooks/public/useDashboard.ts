import { useMemo } from "react";
import { CellTower, DashboardSummary } from "../../types/dashboard";

export const useTowerData = () => {
  // Mock data - 12 towers across 4 cities
  const towers: CellTower[] = [
    {
      id: "1",
      name: "Cairo Tower 1",
      city: "Cairo",
      networkType: "5G",
      status: "active",
      signalStrength: 5,
    },
    {
      id: "2",
      name: "Cairo Tower 2",
      city: "Cairo",
      networkType: "4G",
      status: "active",
      signalStrength: 4,
    },
    {
      id: "3",
      name: "Cairo Tower 3",
      city: "Cairo",
      networkType: "5G",
      status: "offline",
      signalStrength: 2,
    },
    {
      id: "4",
      name: "Alexandria Tower 1",
      city: "Alexandria",
      networkType: "4G",
      status: "active",
      signalStrength: 3,
    },
    {
      id: "5",
      name: "Alexandria Tower 2",
      city: "Alexandria",
      networkType: "5G",
      status: "active",
      signalStrength: 5,
    },
    {
      id: "6",
      name: "Alexandria Tower 3",
      city: "Alexandria",
      networkType: "4G",
      status: "offline",
      signalStrength: 1,
    },
    {
      id: "7",
      name: "Hurghada Tower 1",
      city: "Hurghada",
      networkType: "5G",
      status: "active",
      signalStrength: 4,
    },
    {
      id: "8",
      name: "Hurghada Tower 2",
      city: "Hurghada",
      networkType: "4G",
      status: "active",
      signalStrength: 3,
    },
    {
      id: "9",
      name: "Hurghada Tower 3",
      city: "Hurghada",
      networkType: "5G",
      status: "offline",
      signalStrength: 2,
    },
    {
      id: "10",
      name: "Luxor Tower 1",
      city: "Luxor",
      networkType: "4G",
      status: "active",
      signalStrength: 4,
    },
    {
      id: "11",
      name: "Luxor Tower 2",
      city: "Luxor",
      networkType: "5G",
      status: "offline",
      signalStrength: 2,
    },
    {
      id: "12",
      name: "Luxor Tower 3",
      city: "Luxor",
      networkType: "4G",
      status: "offline",
      signalStrength: 1,
    },
  ];

  return towers;
};

export const useFilteredTowers = (
  towers: CellTower[],
  searchTerm: string,
  selectedCity: string
) => {
  return useMemo(() => {
    return towers.filter((tower) => {
      const matchesSearch = tower.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesCity = selectedCity === "all" || tower.city === selectedCity;
      return matchesSearch && matchesCity;
    });
  }, [towers, searchTerm, selectedCity]);
};

export const useSummary = (filteredTowers: CellTower[]) => {
  return useMemo(() => {
    const activeTowers = filteredTowers.filter(
      (tower) => tower.status === "active"
    );
    const totalSignal = activeTowers.reduce(
      (sum, tower) => sum + tower.signalStrength,
      0
    );
    const avgSignal =
      activeTowers.length > 0 ? totalSignal / activeTowers.length : 0;

    return {
      totalTowers: filteredTowers.length,
      activeTowers: activeTowers.length,
      averageSignal: avgSignal.toFixed(1),
    } as DashboardSummary;
  }, [filteredTowers]);
};

export const useCities = (towers: CellTower[]) => {
  return useMemo(() => {
    return Array.from(new Set(towers.map((tower) => tower.city)));
  }, [towers]);
};
