// src/components/SkillsGraph.js
import React, { useEffect, useRef } from 'react';
import {
  Chart,
  BarController,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from 'chart.js';

// ✅ REGISTER EVERYTHING REQUIRED FOR A BAR CHART
Chart.register(BarController, BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const SkillsGraph = () => {
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);

  useEffect(() => {
    const canvas = chartRef.current;
    const ctx = canvas.getContext('2d');

    // ✅ DESTROY EXISTING CHART INSTANCE
    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    // ✅ CREATE NEW CHART INSTANCE
    chartInstanceRef.current = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['React', 'Node.js', 'Java', 'Python', 'SQL'],
        datasets: [
          {
            label: 'Skill Level',
            data: [8, 6, 7, 5, 6],
            backgroundColor: [
              '#3f51b5',
              '#f50057',
              '#00acc1',
              '#4caf50',
              '#ff9800'
            ],
            borderRadius: 5
          }
        ]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: true,
            position: 'top',
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Proficiency'
            }
          }
        }
      }
    });

    // ✅ CLEANUP CHART ON UNMOUNT
    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
    };
  }, []);

  return (
    <div style={{ maxWidth: 600, margin: 'auto' }}>
      <canvas ref={chartRef}></canvas>
    </div>
  );
};

export default SkillsGraph;
