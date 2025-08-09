import React, { useState, useEffect } from "react";
import * as d3 from "d3";
import "../../../styles/Dashboard.scss";
import { FaBroadcastTower, FaCheckCircle, FaSignal } from "react-icons/fa";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import {
  useTowerData,
  useFilteredTowers,
  useSummary,
  useCities,
} from "../../../hooks/public/useDashboard";

const Dashboard = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCity, setSelectedCity] = useState("all");

  const towers = useTowerData();
  const filteredTowers = useFilteredTowers(towers, searchTerm, selectedCity);
  const summary = useSummary(filteredTowers);
  const cities = useCities(towers);

  const BarChart = () => {
    const svgRef = React.useRef<SVGSVGElement>(null);

    useEffect(() => {
      if (!svgRef.current) return;

      const svg = d3.select(svgRef.current);
      svg.selectAll("*").remove();

      const margin = { top: 20, right: 30, bottom: 40, left: 40 };
      const width = 400 - margin.left - margin.right;
      const height = 300 - margin.top - margin.bottom;

      const cityData = cities.map((city) => ({
        city,
        count: filteredTowers.filter((tower) => tower.city === city).length,
      }));

      const xScale = d3
        .scaleBand()
        .domain(cityData.map((d) => d.city))
        .range([0, width])
        .padding(0.1);

      const yScale = d3
        .scaleLinear()
        .domain([0, d3.max(cityData, (d) => d.count) || 0])
        .range([height, 0]);

      const g = svg
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

      g.selectAll(".bar")
        .data(cityData)
        .enter()
        .append("rect")
        .attr("class", "bar")
        .attr("x", (d) => xScale(d.city) || 0)
        .attr("width", xScale.bandwidth())
        .attr("y", (d) => yScale(d.count))
        .attr("height", (d) => height - yScale(d.count))
        .attr("fill", "#4CAF50");

      g.append("g")
        .attr("transform", `translate(0,${height})`)
        .call(d3.axisBottom(xScale));

      g.append("g").call(d3.axisLeft(yScale));

      svg
        .append("text")
        .attr("x", width / 2 + margin.left)
        .attr("y", margin.top / 2)
        .attr("text-anchor", "middle")
        .style("font-weight", "bold")
        .text("Towers by City");
    }, [filteredTowers, cities]);

    return <svg ref={svgRef} width="400" height="300"></svg>;
  };

  const PieChart = () => {
    const svgRef = React.useRef<SVGSVGElement>(null);

    useEffect(() => {
      if (!svgRef.current) return;

      const svg = d3.select(svgRef.current);
      svg.selectAll("*").remove();

      const width = 400;
      const height = 300;
      const radius = Math.min(width, height) / 2 - 40;

      const statusData = [
        {
          status: "Active",
          count: filteredTowers.filter((tower) => tower.status === "active")
            .length,
        },
        {
          status: "Offline",
          count: filteredTowers.filter((tower) => tower.status === "offline")
            .length,
        },
      ];

      const colorMap: Record<string, string> = {
        Active: "#4CAF50",
        Offline: "#f44336",
      };

      const pie = d3
        .pie<{ status: string; count: number }>()
        .value((d) => d.count);

      const arc = d3
        .arc<d3.PieArcDatum<{ status: string; count: number }>>()
        .innerRadius(0)
        .outerRadius(radius);

      const g = svg
        .append("g")
        .attr("transform", `translate(${width / 2}, ${height / 2})`);

      const arcs = g
        .selectAll(".arc")
        .data(pie(statusData))
        .enter()
        .append("g")
        .attr("class", "arc");

      arcs
        .append("path")
        .attr("d", arc)
        .attr("fill", (d) => colorMap[d.data.status] || "#ccc");

      arcs
        .append("text")
        .attr("transform", (d) => `translate(${arc.centroid(d)})`)
        .attr("text-anchor", "middle")
        .style("font-size", "14px")
        .style("font-weight", "bold")
        .text((d) =>
          d.data.count > 0 ? `${d.data.status}\n${d.data.count}` : ""
        );

      svg
        .append("text")
        .attr("x", width / 2)
        .attr("y", 20)
        .attr("text-anchor", "middle")
        .style("font-weight", "bold")
        .text("Tower Status Distribution");
    }, [filteredTowers]);

    return <svg ref={svgRef} width="400" height="300"></svg>;
  };

  return (
    <div className="dashboard">
      {/* Header */}
      <div className="dashboard-header">
        <h1 className="dashboard-title">Cell Tower Dashboard</h1>
        <p className="dashboard-subtitle">
          Monitor and manage your cell tower network
        </p>
      </div>

      {/* Summary Cards */}
      <div className="summary-cards">
        <div className="summary-card">
          <div className="card-content">
            <div className="card-number">{summary.totalTowers}</div>
            <div className="card-label">Total Towers</div>
          </div>
          <div className="card-icon total">
            <FaBroadcastTower />
          </div>
        </div>

        <div className="summary-card">
          <div className="card-content">
            <div className="card-number">{summary.activeTowers}</div>
            <div className="card-label">Active Towers</div>
          </div>
          <div className="card-icon active">
            <FaCheckCircle />
          </div>
        </div>

        <div className="summary-card">
          <div className="card-content">
            <div className="card-number">{summary.averageSignal}</div>
            <div className="card-label">Average Signal</div>
          </div>
          <div className="card-icon signal">
            <FaSignal />
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="filters-section">
        <div className="filter-group">
          <label htmlFor="search">Search Towers:</label>
          <input
            id="search"
            type="text"
            placeholder="Enter tower name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
        <div className="filter-group">
          <label htmlFor="city">Filter by City:</label>
          <select
            id="city"
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
            className="city-select"
          >
            <option value="all">All Cities</option>
            {cities.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Data Table */}
      <div className="table-section">
        <h2>Towers Information</h2>
        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>City</th>
                <th>Network Type</th>
                <th>Status</th>
                <th>Signal Strength</th>
              </tr>
            </thead>
            <tbody>
              {filteredTowers.map((tower) => (
                <tr key={tower.id}>
                  <td>{tower.name}</td>
                  <td>{tower.city}</td>
                  <td>
                    <span
                      className={`network-badge network-${tower.networkType.toLowerCase()}`}
                    >
                      {tower.networkType}
                    </span>
                  </td>
                  <td>
                    <span className={`status-badge ${tower.status}`}>
                      {tower.status}
                    </span>
                  </td>
                  <td>
                    <div className="signal-display">
                      {[...Array(tower.signalStrength)].map((_, i) => (
                        <AiFillStar key={`fill-${i}`} color="#FFD700" />
                      ))}
                      {[...Array(5 - tower.signalStrength)].map((_, i) => (
                        <AiOutlineStar key={`empty-${i}`} color="#FFD700" />
                      ))}
                      <span className="signal-number">
                        ({tower.signalStrength}/5)
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Charts Section */}
      <div className="charts-section">
        <div className="chart-container">
          <div className="chart-wrapper">
            <BarChart />
          </div>
        </div>
        <div className="chart-container">
          <div className="chart-wrapper">
            <PieChart />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
