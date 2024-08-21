// src/setupTests.ts

import '@testing-library/jest-dom/extend-expect';

// Мокируем HTMLCanvasElement для работы с Chart.js
// @ts-ignore
HTMLCanvasElement.prototype.getContext = (contextId: string) => {
    if (contextId === '2d') {
        return {
            fillRect: jest.fn(),
            clearRect: jest.fn(),
            getImageData: jest.fn(),
            putImageData: jest.fn(),
            createImageData: jest.fn(),
            setTransform: jest.fn(),
            drawImage: jest.fn(),
            save: jest.fn(),
            fillText: jest.fn(),
            restore: jest.fn(),
            beginPath: jest.fn(),
            moveTo: jest.fn(),
            lineTo: jest.fn(),
            closePath: jest.fn(),
            stroke: jest.fn(),
            translate: jest.fn(),
            scale: jest.fn(),
            rotate: jest.fn(),
            arc: jest.fn(),
            fill: jest.fn(),
            measureText: jest.fn().mockReturnValue({ width: 0 }),
            transform: jest.fn(),
            rect: jest.fn(),
            clip: jest.fn(),
            globalAlpha: 1,
            globalCompositeOperation: 'source-over',
            getContextAttributes: jest.fn(),
            canvas: document.createElement('canvas'),
        } as unknown as CanvasRenderingContext2D;
    }

    return null;
};
