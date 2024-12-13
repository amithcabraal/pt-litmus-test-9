import React from 'react';
import { TestRun } from '../../types/TestRun';
import { formatDate } from '../../utils/dateUtils';
import { getTestName, getPurpose, getSentiment } from '../../utils/labelUtils';

interface TestTooltipProps {
  run: TestRun;
  position: { x: number; y: number };
  onClose: () => void;
}

const TestTooltip: React.FC<TestTooltipProps> = ({ run, position }) => {
  const totalVUsers = 
    run.dev_vusers_num +
    run.api_vusers_num +
    run.ui_vusers_num +
    run.erp_vusers_num +
    run.legacy_vusers_num +
    run.mobile_vusers_num;

  const sentiment = getSentiment(run);

  return (
    <div
      className="fixed z-50 bg-white rounded-lg shadow-lg p-4 text-sm"
      style={{
        left: `${position.x}px`,
        top: `${position.y - 120}px`,
        minWidth: '300px'
      }}
    >
      <div className="space-y-2">
        <div className="font-semibold text-gray-800">{getTestName(run)}</div>
        <div className="grid grid-cols-2 gap-x-4 gap-y-1">
          <div className="text-gray-600">Status:</div>
          <div className={`font-medium ${
            run.ui_status === 'PASSED' ? 'text-green-600' : 'text-red-600'
          }`}>{run.ui_status}</div>
          
          <div className="text-gray-600">Purpose:</div>
          <div>{getPurpose(run)}</div>
          
          <div className="text-gray-600">Sentiment:</div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: sentiment.color }} />
            {sentiment.name}
          </div>
          
          <div className="text-gray-600">Start Time:</div>
          <div>{formatDate(parseInt(run.loadtestbegintime))}</div>
          
          <div className="text-gray-600">Duration:</div>
          <div>{Math.round(parseInt(run.duration) / 1000)}s</div>
          
          <div className="text-gray-600">Total VUsers:</div>
          <div>{totalVUsers}</div>
          
          <div className="text-gray-600">Run By:</div>
          <div>{run.test_run_user}</div>
        </div>
      </div>
    </div>
  );
};

export default TestTooltip;