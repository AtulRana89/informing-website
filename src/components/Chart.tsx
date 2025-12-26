import React from 'react';

interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    borderColor: string;
    backgroundColor: string;
  }[];
}

interface ChartProps {
  data: ChartData;
  type?: 'bar' | 'line';
}

const Chart: React.FC<ChartProps> = ({ data, type = 'bar' }) => {
  const maxValue = Math.max(...data.datasets.flatMap(dataset => dataset.data));

  return (
    <div className="w-full">
      {/* Chart legend */}
      <div className="flex items-center justify-center space-x-6 mb-6">
        {data.datasets.map((dataset, index) => (
          <div key={index} className="flex items-center space-x-2">
            <div
              className="w-4 h-4 rounded"
              style={{ backgroundColor: dataset.borderColor }}
            ></div>
            <span className="text-sm text-gray-600 dark:text-gray-400">{dataset.label}</span>
          </div>
        ))}
      </div>

      {/* Chart bars */}
      <div className="flex items-end justify-between space-x-2 h-48">
        {data.labels.map((label, index) => (
          <div key={index} className="flex-1 flex flex-col items-center">
            <div className="flex items-end space-x-1 w-full h-32">
              {data.datasets.map((dataset, datasetIndex) => {
                const height = (dataset.data[index] / maxValue) * 100;
                return (
                  <div
                    key={datasetIndex}
                    className="flex-1 rounded-t"
                    style={{
                      height: `${height}%`,
                      backgroundColor: dataset.backgroundColor,
                      border: `2px solid ${dataset.borderColor}`,
                      minHeight: '4px'
                    }}
                  ></div>
                );
              })}
            </div>
            <span className="text-xs text-gray-500 dark:text-gray-400 mt-2">{label}</span>
          </div>
        ))}
      </div>

      {/* Y-axis labels */}
      <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-2">
        <span>0</span>
        <span>{Math.round(maxValue * 0.25).toLocaleString()}</span>
        <span>{Math.round(maxValue * 0.5).toLocaleString()}</span>
        <span>{Math.round(maxValue * 0.75).toLocaleString()}</span>
        <span>{maxValue.toLocaleString()}</span>
      </div>
    </div>
  );
};

export default Chart;

