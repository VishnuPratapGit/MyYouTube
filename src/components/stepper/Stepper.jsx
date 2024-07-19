import React, { useState } from 'react';

const Stepper = () => {
    const [currentStep, setCurrentStep] = useState(0);
    const steps = ['Details', 'Video elements', 'Checks', 'Visibility'];

    const nextStep = () => {
        if (currentStep < steps.length - 1) {
            setCurrentStep(currentStep + 1);
        }
    };

    const prevStep = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
        }
    };

    return (
        <div className="w-full p-5 bg-gray-800 text-white flex flex-col items-center">
            <div className="flex justify-between w-full">
                {steps.map((step, index) => (
                    <div key={index} className="flex flex-col items-center relative flex-1">
                        {/* circle */}
                        <div className={`w-8 h-8 flex items-center justify-center rounded-full ${index <= currentStep ? 'bg-white text-black' : 'bg-gray-600 text-white'}`}>
                            {index < currentStep ? <span>&#10003;</span> : <span>{index + 1}</span>}
                        </div>

                        {/* name */}
                        <div className="mt-2">{step}</div>

                        {/* line */}
                        {index < steps.length - 1 && (
                            <div className={`absolute top-4 left-1/2 transform -translate-x-1/2 w-full h-0.5 ${index < currentStep ? 'bg-white' : 'bg-gray-600'}`}></div>
                        )}
                    </div>
                ))}
            </div>
            <div className="mt-5 space-x-4">
                <button
                    onClick={prevStep}
                    disabled={currentStep === 0}
                    className="px-4 py-2 bg-gray-600 hover:bg-gray-500 disabled:bg-gray-700 rounded text-white"
                >
                    Back
                </button>
                <button
                    onClick={nextStep}
                    disabled={currentStep === steps.length - 1}
                    className="px-4 py-2 bg-gray-600 hover:bg-gray-500 disabled:bg-gray-700 rounded text-white"
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default Stepper;
