const { Circle, Square, Triangle } = require('./shapes');

describe('Circle', () => {
    it('should render correct SVG string with given color', () => {
        const circle = new Circle('red');
        expect(circle.render()).toEqual('<circle cx="150" cy="100" r="50" fill="red" />');
    });
});

describe('Square', () => {
    it('should render correct SVG string with given color', () => {
        const square = new Square('blue');
        expect(square.render()).toEqual('<rect x="100" y="50" width="100" height="100" fill="blue" />');
    });
});

describe('Triangle', () => {
    it('should render correct SVG string with given color', () => {
        const triangle = new Triangle('green');
        expect(triangle.render()).toEqual('<polygon points="150, 18 244, 182 56, 182" fill="green" />');
    });
});

describe('setColor method', () => {
    it('should update the color of a shape', () => {
        const triangle = new Triangle('green');
        triangle.setColor('purple');
        expect(triangle.render()).toEqual('<polygon points="150, 18 244, 182 56, 182" fill="purple" />');
    });
});
