type StepperProps = {
  currentStep: number;
  steps: string[];
};

export const Stepper = ({ currentStep, steps }: StepperProps) => {
  return (
    <div className="flex items-center justify-between mb-6">
      {steps.map((label, index) => {
        const isActive = index === currentStep;
        const isCompleted = index < currentStep;

        return (
          <div key={index} className="flex-1 flex items-center">
            <div
              className={`w-8 h-8 flex items-center justify-center rounded-full border-2 
                ${isCompleted ? "bg-green-500 border-green-500 text-white" : 
                  isActive ? "border-blue-500 text-blue-500" : 
                  "border-gray-300 text-gray-400"}
              `}
            >
              {isCompleted ? "✓" : index + 1}
            </div>

            <span className="ml-2 text-sm">
              {label}
            </span>

            {index < steps.length - 1 && (
              <div
                className={`flex-1 h-[2px] mx-2 
                  ${isCompleted ? "bg-green-500" : "bg-gray-300"}`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};
